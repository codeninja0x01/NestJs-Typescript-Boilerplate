import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

import { isProdMode } from '../../app.environment';
import { IEmailOptions } from '../../interfaces/email.interface';
import { ConfigService } from '../config/config.service';

@Injectable()
export class EmailService {

  private transporter: nodemailer;
  private clientIsValid: boolean;

  constructor(
    private config: ConfigService
  ) {
    this.run();
  }

  public sendMail(mailOptions: IEmailOptions): any {
    if (!this.clientIsValid) {
      console.warn('Mail client sent rejected because initialization succeeded');
      return false;
    }
    const options = Object.assign(mailOptions, { from: this.config.get('EMAIL_FROM') });
    this.transporter.sendMail(options, (error, info) => {
      if (error) {
        console.warn('Mail failed to send', error);
      } else {
        console.log('Mail sent successfully', info.messageId, info.response);
      }
    });
  }

  private verifyClient(): void {
    return this.transporter.verify((error, success) => {
      if (error) {
        this.clientIsValid = false;
        setTimeout(this.verifyClient.bind(this), 1000 * 60 * 60);
        setTimeout(() => console.warn('The mail client failed to initialize the connection and will try again in an hour', error.message), 0);
      } else {
        this.clientIsValid = true;
        setTimeout(() => console.log('The mail client initiates a successful connection and can send mail at any time.'), 0);
      }
    });
  }

  private async run(): Promise<void> {
    if (isProdMode) {
      this.transporter = nodemailer.createTransport({
        host: this.config.get('EMAIL_HOST'),
        secure: this.config.get('EMAIL_SECURE'),
        port: this.config.get('EMAIL_PORT'),
        auth: {
          user: this.config.get('EMAIL_ACCOUNT'),
          pass: this.config.get('EMAIL_PASSWORD'),
        },
      });
    } else {
      const testAccount = await nodemailer.createTestAccount();
      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        secure: false,
        port: 587,
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
    }
    this.verifyClient();
  }
}
