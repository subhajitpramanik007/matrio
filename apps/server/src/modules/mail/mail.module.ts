import { Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        transport: {
          host: 'smtp.mailtrap.io',
          port: 2525,
          auth: {
            user: config.get('MAILTRAP_USERNAME'),
            pass: config.get('MAILTRAP_PASS'),
          },
        },
        defaults: {
          from: '"Matrio" <no-reply@matrio.online>',
        },
      }),
    }),
  ],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
