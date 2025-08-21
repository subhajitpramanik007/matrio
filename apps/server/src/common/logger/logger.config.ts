import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';
import path from 'path';

const logDir = path.join(__dirname, '..', '..', 'logs');

export const winstonConfig = {
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.errors({ stack: true }),
        winston.format.json(),
        nestWinstonModuleUtilities.format.nestLike('Matrio Server', {
          colors: true,
          prettyPrint: true,
          processId: false,
        }),
      ),
    }),

    // new winston.transports.File({
    //   filename: path.join(logDir, 'requests.log'),
    //   level: 'info',
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json(),
    //   ),
    // }),

    // new winston.transports.File({
    //   filename: path.join(logDir, 'errors.log'),
    //   level: 'error',
    //   format: winston.format.combine(
    //     winston.format.timestamp(),
    //     winston.format.json(),
    //   ),
    // }),
  ],
};
