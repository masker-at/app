import { AxiosInstance } from 'axios';

export type SendMessage = {
  to: string[];
  cc?: string[];
  bcc?: string[];
  from: string;
  sender?: string;
  subject: string;
  tag?: string;
  replyTo?: string;
  attachments?: {
    contentType: string;
    data: Buffer;
    fileName: string;
  }[];
} & ({ plainBody: string; htmlBody?: string } | { plainBody?: string; htmlBody: string });

export default async function sendMessage(
  client: AxiosInstance,
  message: SendMessage,
): Promise<void> {
  const transformedMessage = {
    to: message.to,
    cc: message.cc,
    bcc: message.bcc,
    from: message.from,
    sender: message.sender,
    subject: message.subject,
    tag: message.tag,
    reply_to: message.replyTo,
    attachments: message.attachments?.map(({ contentType, data, fileName }) => ({
      content_type: contentType,
      data: data.toString('base64'),
      name: fileName,
    })),
    plain_body: message.plainBody,
    html_body: message.htmlBody,
  };
  await client.post('/api/v1/send/message', transformedMessage);
}
