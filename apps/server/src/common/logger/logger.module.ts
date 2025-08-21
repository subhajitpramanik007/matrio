import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestLoggerMiddleware } from './logger.middleware';
import { WinstonModule } from 'nest-winston';
import { winstonConfig } from './logger.config';

@Module({
  imports: [WinstonModule.forRoot(winstonConfig)],
  exports: [WinstonModule],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestLoggerMiddleware).forRoutes('*path');
  }
}
