import { Global, Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from './error.filter';
import { ValidationService } from './validation.service';

@Global()
@Module({
  providers: [
    ValidationService,
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
  exports: [ValidationService],
})
export class CommonModule {}
