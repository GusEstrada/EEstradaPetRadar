import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailOptions } from 'src/core/models/email-options.model';
import { envs } from 'src/config/envs';

@Injectable()
export class EmailService {

  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: envs.MAILER_EMAIL,
      pass: envs.MAILER_PASSWORD
    }
  });

  async sendEmail(options: EmailOptions) {
    await this.transporter.sendMail({
      from: envs.MAILER_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.htmlBody
    });
  }
}