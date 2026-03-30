import { MailDto } from '@cart-app/types';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailsService {
  private readonly transporter: nodemailer.Transporter;

  constructor(private readonly configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.getOrThrow<string>('SMTP_HOST'),
      port: this.configService.getOrThrow<number>('SMTP_PORT'),
      secure: false,
      auth: {
        user: this.configService.getOrThrow<string>('MAIL_USER'),
        pass: this.configService.getOrThrow<string>('MAIL_PASS'),
      },
    });
  }

  async sendMail(to: string, subject: string, dto: MailDto) {
    const from = this.configService.getOrThrow<string>('MAIL_FROM');

    const attachments = dto.items.map((item, index) => ({
      filename: `product-${index}.jpg`,
      path: item.imageUrl,
    }));

    const html = `
      <h2>Your Order Summary</h2>
      <table border="1" cellpadding="5" cellspacing="0">
        <thead>
          <tr>
            <th>Product</th>
            <th>Brand</th>
            <th>Size</th>
            <th>Color</th>
            <th>Quantity</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          ${dto.items
            .map(
              (item) => `
            <tr>
              <td>${item.productName}</td>
              <td>${item.brand}</td>
              <td>${item.size ?? '-'}</td>
              <td>${item.color}</td>
              <td>${item.quantity}</td>
              <td>${item.price}</td>
            </tr>
          `,
            )
            .join('')}
        </tbody>
      </table>
      <p><strong style="font-size: 22px">Total Price: $${dto.totalPrice}</strong></p>
    `;

    await this.transporter.sendMail({
      from: `"Cart App" <${from}>`,
      to,
      subject,
      html,
      attachments,
    });
  }
}
