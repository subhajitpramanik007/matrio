import { Module } from '@nestjs/common';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { RATE_LIMITER_WINDOW_MS, RATE_LIMITER_MAX } from './constant';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: RATE_LIMITER_WINDOW_MS,
        limit: RATE_LIMITER_MAX,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class RateLimitModule {}
