import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AUTH_COOKIE_ACCESS_TOKEN } from '../constant';
import { UserJWTPayload } from 'src/types';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        JwtAccessStrategy.extractJwtFromCookie,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: configService.get<string>('JWT_ACCESS_SECRET')!,
      ignoreExpiration: false,
    });
  }

  public static extractJwtFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies[AUTH_COOKIE_ACCESS_TOKEN]) {
      return req.cookies[AUTH_COOKIE_ACCESS_TOKEN];
    }
    return null;
  }

  validate(payload: UserJWTPayload) {
    // TODO: if have email but not verified, throw error
    if (payload.email && !payload.emailVerified && payload.role === 'USER') {
      throw new UnauthorizedException('Email not verified', {
        cause: 'EMAIL_NOT_VERIFIED',
      });
    }

    return payload;
  }
}
