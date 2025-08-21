import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJWTPayload } from 'src/types';

export const GetUser = createParamDecorator(
  (data: keyof UserJWTPayload | undefined, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return data ? req.user?.[data] : req.user;
  },
);
