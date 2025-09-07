import { UseInterceptors, applyDecorators } from '@nestjs/common';
import { TransformInterceptor } from '../interceptors/transform.interceptor';

export function Serialize(dto: any) {
  return applyDecorators(UseInterceptors(new TransformInterceptor(dto)));
}
