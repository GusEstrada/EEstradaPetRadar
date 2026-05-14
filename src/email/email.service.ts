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
      pass: envs.MAILER_SECRET_KEY, 
    },
  });

  async sendEmail(options: EmailOptions) {
    try {
      await this.transporter.sendMail({
        from: envs.MAILER_EMAIL,
        to: options.to,
        subject: options.subject,
        html: options.htmlBody,
      });
      console.log(`✅ Email enviado correctamente a: ${options.to}`);
    } catch (error) {
      console.error('❌ Error al enviar el email:', error);
      throw error; // Lo lanzamos para que el controlador lo cachee como un 500
    }
  }
}