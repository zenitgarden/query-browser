import { Body, Controller, Get, Header, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigRequest, QueryRequest, WebResponse } from './model/web.model';

@Controller('/api/qb') // qb = querybrowser
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'hello';
  }

  @Post('/test')
  @Header('Content-Type', 'application/json')
  async testConnection(@Body() req: ConfigRequest): Promise<WebResponse> {
    await this.appService.testConnection(req);
    return {
      message: 'Test connection success',
    };
  }

  @Post('/connect')
  @Header('Content-Type', 'application/json')
  async connect(@Body() req: ConfigRequest): Promise<WebResponse> {
    await this.appService.createConnection(req);
    return {
      message: 'Connected',
    };
  }

  @Post('/disconnect')
  @Header('Content-Type', 'application/json')
  async disconnet(): Promise<WebResponse> {
    await this.appService.endConnection();
    return {
      message: 'Disconnected',
    };
  }

  @Post('/exec')
  @Header('Content-Type', 'application/json')
  async execQuery(@Body() req: QueryRequest): Promise<WebResponse> {
    const result = await this.appService.execQuery(req.query);
    return {
      message: 'success',
      data: result,
    };
  }
}
