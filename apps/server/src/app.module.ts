import { Module } from '@nestjs/common';

import { LoggerModule } from './common/logger/logger.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './modules/mail/mail.module';
import { RateLimitModule } from './common/rate-limiter/rate-limiter.module';

import { HealthModule } from './modules/health/health.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProfileModule } from './modules/profile/profile.module';
import { AvatarsModule } from './modules/avatars/avatars.module';

@Module({
  imports: [
    LoggerModule,
    ConfigModule.forRoot({ isGlobal: true }),
    RateLimitModule,
    HealthModule,
    PrismaModule,
    MailModule,
    AuthModule,
    UsersModule,
    ProfileModule,
    AvatarsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
