import { AxiosInstance } from 'axios';
import nodemailer from 'nodemailer';

export type SendMessage = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  sender?: string;
  subject: string;
  replyTo?: string;
  attachments?: {
    contentType: string;
    data: Buffer;
    fileName: string;
  }[];
} & ({ plainBody: string; htmlBody?: string } | { plainBody?: string; htmlBody: string });

const transport = nodemailer.createTransport({
  streamTransport: true,
  buffer: true,
});

export default async function sendMessage(
  client: AxiosInstance,
  message: SendMessage,
): Promise<void> {
  const result = await transport.sendMail({
    to: message.to,
    cc: message.cc,
    bcc: message.bcc,
    from: message.from,
    sender: message.sender,
    subject: message.subject,
    replyTo: message.replyTo,
    attachments: message.attachments?.map(({ contentType, data, fileName }) => ({
      contentType,
      content: data,
      filename: fileName,
    })),
    text: message.plainBody,
    html: message.htmlBody,
  });
  const data = (result.message as Buffer).toString('base64');

  await client.post('/api/v1/send/raw', {
    data,
    mail_from: message.from,
    rcpt_to: message.to,
  });
}
