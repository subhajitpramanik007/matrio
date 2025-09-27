import { CanActivate, ExecutionContext, Injectable, Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { ConfigService } from '@nestjs/config';
import { RATE_LIMITER_WINDOW_MS, RATE_LIMITER_MAX } from './constant';

@Injectable()
class RateLimiterGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly throttlerGuard: ThrottlerGuard,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    if (this.config.get<string>('NODE_ENV') === 'test') {
      return true;
    }

    return this.throttlerGuard.canActivate(context);
  }
}

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
    ThrottlerGuard,
    {
      provide: APP_GUARD,
      useClass: RateLimiterGuard,
    },
  ],
})
export class RateLimitModule {}
