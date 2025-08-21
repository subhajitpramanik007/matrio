import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Inject,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status = exception instanceof HttpException ? exception.getStatus() : 500;

    const responseMessage =
      exception instanceof HttpException
        ? exception.getResponse()
        : new InternalServerErrorException().getResponse();

    this.logger.error('Unhandled Exception', {
      status,
      response: responseMessage,
      path: request.url,
      method: request.method,
      stack: exception instanceof Error ? exception.stack : null,
    });

    response.status(status).json(responseMessage);
  }
}
