import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Client, Pool } from 'pg';
import { ConfigRequest } from './model/web.model';
import { ValidationService } from './common/validation.service';

@Injectable()
export class AppService {
  pool: Pool;
  currentConfig: ConfigRequest;

  constructor(private validationService: ValidationService) {}

  isConnected(): boolean {
    return this.pool?.totalCount >= 0;
  }
  async createConnection(config: ConfigRequest): Promise<void> {
    this.validationService.validateConfig(config);
    if (this.isConnected())
      throw new HttpException(this.currentConfig, HttpStatus.BAD_REQUEST, {
        cause: 'Already Connected',
      });
    this.pool = new Pool({ ...config, port: 5432 });
    try {
      const client = await this.pool.connect();
      client.release();
      this.currentConfig = config;
    } catch (err) {
      this.pool = null;
      throw new BadRequestException(err.message);
    }
  }

  async testConnection(config: ConfigRequest): Promise<void> {
    this.validationService.validateConfig(config);
    const client = new Client({ ...config, port: 5432 });
    try {
      await client.connect();
    } catch (err) {
      throw new BadRequestException(err.message);
    } finally {
      await client.end();
    }
  }

  async endConnection(): Promise<void> {
    if (!this.isConnected())
      throw new BadRequestException('Not connected in any database');
    await this.pool.end();
    this.pool = null;
  }

  async execQuery(query: string): Promise<Array<any>> {
    if (!this.isConnected())
      throw new BadRequestException('Not connected in any database');
    try {
      const result = await this.pool.query(query);
      return result.rows;
    } catch (err) {
      if (err.message === 'Client was passed a null or undefined query') {
        throw new BadRequestException('The query is null or undefined');
      }
      throw new BadRequestException(err.message);
    }
  }
}
