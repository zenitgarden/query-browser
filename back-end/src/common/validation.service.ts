import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigRequest } from 'src/model/web.model';

@Injectable()
export class ValidationService {
  validateConfig(config: ConfigRequest): void {
    const result = [];
    if (!config.database) result.push({ database: 'database is required' });
    if (!config.host) result.push({ host: 'host is required' });
    if (!config.user) result.push({ user: 'user is required' });
    if (!config.password) result.push({ password: 'password is required' });
    if (result.length > 0) throw new BadRequestException(result);
  }
}
