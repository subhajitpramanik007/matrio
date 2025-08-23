import { Response } from 'express';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import {
  AUTH_COOKIE_ACCESS_MAX_AGE,
  AUTH_COOKIE_ACCESS_TOKEN,
  AUTH_COOKIE_IS_GUEST,
  AUTH_COOKIE_REFRESH_MAX_AGE,
  AUTH_COOKIE_REFRESH_TOKEN,
} from '../constant';

@Injectable()
export class AuthCookiesService {
  constructor(private readonly config: ConfigService) {}

  set(res: Response, accessToken: string, refreshToken: string, isGuest: boolean) {
    const secure = this.config.get('NODE_ENV') === 'production';
    const sameSite = 'lax';
    const httpOnly = true;

    res.cookie(AUTH_COOKIE_ACCESS_TOKEN, accessToken, {
      httpOnly,
      secure,
      maxAge: AUTH_COOKIE_ACCESS_MAX_AGE,
      sameSite,
    });

    res.cookie(AUTH_COOKIE_REFRESH_TOKEN, refreshToken, {
      httpOnly,
      secure,
      maxAge: AUTH_COOKIE_REFRESH_MAX_AGE,
      sameSite,
    });

    res.cookie(AUTH_COOKIE_IS_GUEST, isGuest, {
      httpOnly,
      maxAge: AUTH_COOKIE_REFRESH_MAX_AGE,
    });
  }

  clear(res: Response) {
    res.clearCookie(AUTH_COOKIE_ACCESS_TOKEN);
    res.clearCookie(AUTH_COOKIE_REFRESH_TOKEN);
    res.clearCookie(AUTH_COOKIE_IS_GUEST);
  }
}
