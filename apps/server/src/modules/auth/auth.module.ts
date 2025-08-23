import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStrategy } from './strategies/jwt-access.strategy';
import { AuthCookiesService } from './services/auth-cookies.service';
import { SessionService } from './services/session.service';
import { TokenService } from './services/token.service';
import { UserService } from './services/user.service';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_ACCESS_SECRET,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtAccessStrategy,
    UserService,
    SessionService,
    TokenService,
    AuthCookiesService,
  ],
})
export class AuthModule {}
