import { BaseController } from '@/common/base/base.controller';
import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { SkipThrottle } from '@nestjs/throttler';

@SkipThrottle()
@Controller('health')
export class HealthController extends BaseController {
  constructor() {
    super();
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    Logger.debug('Health check', 'HealthController');
    throw new Error('Health check');
    // return this.success({ timestamp: Date.now() }, 'OK');
  }
}
