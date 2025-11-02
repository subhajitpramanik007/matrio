import { type Response } from 'express';
import { AuthService } from './auth.service';
import {
  BadRequestException,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';

import { JwtAccessGuard } from './guards';
import { Cookies, GetUser, ZodBody } from '@/common/decorators';
import { BaseController } from '@/common/base/base.controller';

import {
  type TUserSignin,
  UserSigninSchema,
  type TUserSignup,
  UserSignupSchema,
  type TEmailVerification,
  EmailVerificationSchema,
  type TResendVerificationEmail,
  ResendVerificationEmailSchema,
} from '@matrio/shared/schemas';
import { AUTH_COOKIE_REFRESH_TOKEN, AUTH_RATE_LIMITS } from './constant';

@Controller('auth')
export class AuthController extends BaseController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Throttle(AUTH_RATE_LIMITS.guest)
  @Post('guest')
  @HttpCode(HttpStatus.CREATED)
  async guest(@Res({ passthrough: true }) res: Response) {
    const { accessToken } = await this.authService.createGuest(res);

    return this.success({ accessToken }, 'Guest created');
  }

  @Throttle(AUTH_RATE_LIMITS.signup)
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  async signup(
    @ZodBody(UserSignupSchema) data: TUserSignup,
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) token: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signup(res, data, token);

    return this.success({ accessToken }, 'User signed up successfully');
  }

  @Throttle(AUTH_RATE_LIMITS.emailVerify)
  @Post('email-verify')
  @HttpCode(HttpStatus.OK)
  async emailVerify(
    @ZodBody(EmailVerificationSchema) data: TEmailVerification,
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) refreshToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.verifyEmail(res, data, refreshToken);

    return this.success({ accessToken }, 'Email verified successfully');
  }

  @Throttle(AUTH_RATE_LIMITS.resendVerificationEmail)
  @Post('resend-verification-email')
  @HttpCode(HttpStatus.OK)
  async resendVerificationEmail(
    @ZodBody(ResendVerificationEmailSchema) data: TResendVerificationEmail,
  ) {
    await this.authService.resendVerificationEmail(data.email);
    return this.success('Verification email sent successfully');
  }

  @Throttle(AUTH_RATE_LIMITS.signin)
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  async signin(
    @ZodBody(UserSigninSchema) data: TUserSignin,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.signin(res, data);

    return this.success({ accessToken }, 'User signed in successfully');
  }

  @Post('signout')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async signout(
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) refreshToken: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    await this.authService.signout(res, refreshToken);
    return this.success('User signed out successfully');
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(
    @Cookies(AUTH_COOKIE_REFRESH_TOKEN) token: string | undefined,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { accessToken } = await this.authService.refreshUser(res, token);

    return this.success({ accessToken }, 'Token refreshed');
  }

  @Get('session')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  async session(@GetUser('id') userId: string) {
    const user = await this.authService.getSessionData(userId);

    return this.success({ user });
  }

  @Post('session/check')
  @HttpCode(HttpStatus.OK)
  @UseGuards(JwtAccessGuard)
  verify(@GetUser('role') role: string) {
    return this.success({ role }, 'Session is valid');
  }
}
