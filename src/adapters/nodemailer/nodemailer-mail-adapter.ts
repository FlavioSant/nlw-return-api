import nodemailer from "nodemailer";
import { MailAdapter, SendMailData } from "../mail-adapter";

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "ec603b3ff55432",
    pass: "7c6bd374543eb8",
  },
});

export class NodemailerMailAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <test@feedget.com>",
      to: "Flávio Santos <flaviohenrique_santos@hotmail.com>",
      subject,
      html: body,
    });
  }
}
