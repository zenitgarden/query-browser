import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';

export class ErrorFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const res = host.switchToHttp().getResponse();
    if (exception instanceof HttpException) {
      if (exception.cause === 'Already Connected') {
        res.status(exception.getStatus()).json({
          data: exception.getResponse(),
          errors: {
            message: exception.cause,
            error: 'Bad Request',
            statusCode: exception.getStatus(),
          },
        });
      } else {
        res.status(exception.getStatus()).json({
          errors: exception.getResponse(),
        });
      }
    } else {
      res.status(500).json({
        errors: exception.message,
      });
    }
  }
}
