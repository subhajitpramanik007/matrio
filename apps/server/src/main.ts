import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/logger.config';
import { VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter';
import cookieParser from 'cookie-parser';

const PORT = process.env.PORT ?? 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));

  app.enableCors({
    origin: process.env.ORIGIN ?? 'http://localhost:3000',
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  await app.listen(PORT);
}
bootstrap();
