import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Inject } from '@nestjs/common';

import crypto from 'crypto';

@Injectable()
export class RequestLoggerMiddleware implements NestMiddleware {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly logger: Logger) {}

  use(req: Request, res: Response, next: NextFunction) {
    const startTime = Date.now();

    const { method, originalUrl } = req;

    const requestId = crypto.randomBytes(16).toString('hex');
    req['requestId'] = requestId;
    res.setHeader('X-Request-Id', requestId);

    res.on('finish', () => {
      const { statusCode } = res;
      const logMessage = `[${req['requestId']} - ${method}] {${originalUrl} ${statusCode}}`;

      const logData = {
        requestId,
        method,
        url: originalUrl,
        statusCode,
        responseTime: Date.now() - startTime + ' ms',
      };

      if (statusCode >= 400) {
        this.logger.error(`${logMessage}`, logData);
      } else {
        this.logger.info(`${logMessage}`, logData);
      }
    });

    next();
  }
}
