import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER, WinstonModule } from 'nest-winston';
import { winstonConfig } from './common/logger/logger.config';
import { Logger, VersioningType } from '@nestjs/common';
import { AllExceptionsFilter } from './common/filter';
import cookieParser from 'cookie-parser';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const PORT = process.env.PORT ?? 8000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalFilters(new AllExceptionsFilter(app.get(WINSTON_MODULE_NEST_PROVIDER)));

  const corsOrigins = process.env.CORS_ORIGIN === '*' ? '*' : process.env.CORS_ORIGIN?.split(',');
  if (!corsOrigins) Logger.error('CORS_ORIGIN is not set');
  else Logger.log(`${JSON.stringify(corsOrigins)}`, 'CORS_ORIGIN');

  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  app.use(cookieParser());

  app.setGlobalPrefix('api');
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: '1' });

  // Swagger documentation
  if (process.env.NODE_ENV !== 'production') {
    const config = new DocumentBuilder()
      .setTitle('Matrio API')
      .setDescription('The Matrio API description')
      .setVersion('1.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(PORT, '0.0.0.0');
}

bootstrap();
