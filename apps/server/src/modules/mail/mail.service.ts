import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MailService {
  constructor(
    private readonly mailer: MailerService,
    private readonly config: ConfigService,
  ) {}

  private get getAppUrl() {
    return this.config.get('CLIENT_URL');
  }

  async sendWelcomeEmail(email: string, username: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Welcome to Matrio!',
      text: `Hello ${username}, welcome to Matrio!`,
      html: `<h1>Hello ${username}, welcome to Matrio!</h1>`,
    });
  }

  async sendVerificationEmail(email: string, token: string) {
    await this.mailer.sendMail({
      to: email,
      subject: 'Verify your email',
      text: `Please click the link below to verify your email: `,
      html: `<p>Please click the link below to verify your email: <a href="${this.getAppUrl}/verify/${token}">Verify</a></p>`,
    });
  }
}
