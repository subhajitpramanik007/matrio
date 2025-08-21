import { Controller, Get, HttpCode, HttpStatus, Logger } from '@nestjs/common';

@Controller('health')
export class HealthController {
  constructor() {}

  @Get()
  @HttpCode(HttpStatus.OK)
  healthCheck() {
    Logger.debug('Health check', 'HealthController');
    return { success: true, message: 'I am healthy' };
  }
}
