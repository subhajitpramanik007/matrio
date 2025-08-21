import { Module } from '@nestjs/common';

import { HealthModule } from './modules/health/health.module';
import { LoggerModule } from './common/logger/logger.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { RateLimitModule } from './common/rate-limiter/rate-limiter.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RateLimitModule,
    HealthModule,
    AuthModule,
    PrismaModule,
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
