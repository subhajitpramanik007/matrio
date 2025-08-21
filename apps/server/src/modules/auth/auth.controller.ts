import { type Response } from 'express';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';

import { JwtAccessGuard } from './guards';
import { successResponse } from '@/common/response';
import { Cookies, ZodBody, ZodQuery } from '@/common/decorators';

import {
  type TUserSignin,
  UserSigninSchema,
  type TUserSignup,
  UserSignupSchema,
  type TEmailVerification,
  EmailVerificationSchema,
  type TResendVerificationEmail,
  ResendVerificationEmailSchema,
} from './schemas';
import { AUTH_COOKIE_REFRESH_TOKEN } from './constant';
import { Throttle } from '@nestjs/throttler';
import { DAY, HOUR } from '@/common/rate-limiter/constant';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Throttle({ default: { ttl: HOUR * 3, limit: 1 } })
  @Post('guest')
  @HttpCode(HttpStatus.CREATED)
  async guest(@Res({ passthrough: true }) res: Response) {
    const guest = await this.authService.createGuest();
    const tokens = await this.authService.issueAuthTokens(guest);

    this.authService.setAuthCookies(res, tokens.accessToken, tokens.refreshToken, true);

    await this.authService.createSession(guest.id, tokens.refreshToken);

    return successResponse({ accessToken: tokens.accessToken }, 'Guest created');
  }

  @Throttle({ default: { ttl: HOUR / 2, limit: 5 } })
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @ZodBody(UserSignupSchema) data: TUserSignup,
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signup(data, token);

    const { accessToken, refreshToken } = await this.authService.issueAuthTokens(user);
    await this.authService.setAuthCookies(res, accessToken, refreshToken, false);
    await this.authService.createSession(user.id, refreshToken);

    return successResponse({ accessToken }, 'User signed up successfully');
  }

  @Throttle({ default: { ttl: HOUR, limit: 3 } })
  @Post('email-verify')
  @HttpCode(HttpStatus.OK)
  async emailVerify(
    @ZodQuery(EmailVerificationSchema) data: TEmailVerification,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.verifyEmail(data.email, data.token);
    const user = await this.authService.getUserByEmail(data.email);
    if (!user) throw new BadRequestException('User not found');
    const { accessToken, refreshToken } = await this.authService.issueAuthTokens(user);

    await this.authService.setAuthCookies(res, accessToken, refreshToken, false);
    await this.authService.updateSessionByToken(data.token, refreshToken);

    return successResponse({ accessToken }, 'Email verified successfully');
  }

  @Throttle({ default: { ttl: HOUR, limit: 3 } })
  @Post('resend-verification-email')
  @HttpCode(HttpStatus.OK)
  async resendVerificationEmail(
    @ZodBody(ResendVerificationEmailSchema) data: TResendVerificationEmail,
  ) {
    await this.authService.resendVerificationEmail(data.email);
    return { message: 'Verification email sent successfully' };
  }

  @Throttle({ default: { ttl: HOUR / 2, limit: 3 } })
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @ZodBody(UserSigninSchema) data: TUserSignin,
    @Res({ passthrough: true }) res: Response,
  ) {
    const user = await this.authService.signin(data);
    const { accessToken, refreshToken } = await this.authService.issueAuthTokens(user);

    this.authService.setAuthCookies(res, accessToken, refreshToken, false);
    await this.authService.createSession(user.id, refreshToken);

    return successResponse({ accessToken: accessToken }, 'User signed in successfully');
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async signout(
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) refreshToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signout(res, refreshToken);
    return { message: 'User signed out successfully' };
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) token: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.refreshUser(res, token);

    return successResponse({ accessToken }, 'Token refreshed');
  }

  @Post('check')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async verify() {
    return { success: true };
  }
}
