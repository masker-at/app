import { htmlToText } from 'html-to-text';
import cheerio from 'cheerio';
import { Alias } from '@masker-at/postgres-models';

/* eslint-disable camelcase */
export interface IncomingEmail {
  id: number;
  rcpt_to: string;
  mail_from: string;
  token: string;
  subject: string;
  message_id: string;
  timestamp: number;
  size: string;
  spam_status: 'NotSpam' | 'Spam';
  bounce: boolean;
  received_with_ssl: boolean;
  to: string;
  cc: string | null;
  from: string;
  date: string;
  in_reply_to: string | null;
  references: string | null;
  plain_body: string | null;
  html_body: string | null;
  auto_submitted: string | null;
  attachment_quantity: number;
  attachments: {
    filename: string;
    content_type: string;
    size: number;
    data: string;
  }[];
}
/* eslint-enable camelcase */

export function decorateText(message: IncomingEmail, alias: Alias): string {
  if (message.plain_body || message.html_body) {
    const originalText =
      message.plain_body ||
      htmlToText(message.html_body!, {
        tags: {
          a: { options: { hideLinkHrefIfSameAsText: true } },
          img: { format: 'skip' },
        },
      });
    return `From: ${message.mail_from}
To: ${alias.name ? `${alias.name} ` : ''}${message.rcpt_to}

--- Start of forwarded message
${originalText}
--- End of forwarded message

You received this message because ${message.mail_from} sent it to ${message.rcpt_to} and it was
forwarded to you because this alias is associated with your account in Masker@ (https://www.masker.at).
If you no longer want to receive emails sent to ${
      message.rcpt_to
    }, you can deactivate or delete this alias.
`;
  }

  return `From: ${message.mail_from}
To: ${alias.name ? `${alias.name} ` : ''}${message.rcpt_to}
You received this message because ${message.mail_from} sent it to ${message.rcpt_to} and it was
forwarded to you because this alias is associated with your account in Masker@ (https://www.masker.at).
If you no longer want to receive emails sent to ${
    message.rcpt_to
  }, you can deactivate or delete this alias.
`;
}

const createLink = (href: string, anchor: string) => `
  <a
    href="${href}"
    style="font-size: inherit; color: #227e68; text-decoration: underline;"
  >${anchor}</a>
`;

const createMailtoLink = (email: string) => createLink(`mailto:${email}`, email);

export function decorateHTML(message: IncomingEmail, alias: Alias): string | null {
  if (!message.html_body) return null;
  const $ = cheerio.load(message.html_body);
  $('body').prepend(`
    <table
      width="100%"
      cellspacing="0"
      cellpadding="0"
      style="
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
        border-collapse: collapse;
        border-spacing: 0px;
        padding: 0 0 10px;
        margin: 0 0 10px;
        width: 100%;
        border-bottom: 1px solid black;
        font-family: sans-serif;
      "
    >
      <tr>
        <td style="padding: 0; margin: 0; font-size: 0px" align="left">
          <img
            class="adapt-img"
            src="https://rfchve.stripocdn.email/content/guids/CABINET_21e2a469aad4dacfc620e4336190b1da/images/19311630605299739.png"
            alt
            style="
              display: block;
              border: 0;
              outline: none;
              text-decoration: none;
              -ms-interpolation-mode: bicubic;
              margin: 0 auto;
            "
            width="166"
          />
        </td>
      </tr>
      <tr>
        <td align="left" style="padding: 0; margin: 0">
          <p
            style="
              margin: 0;
              -webkit-text-size-adjust: none;
              -ms-text-size-adjust: none;
              mso-line-height-rule: exactly;
              font-family: arial, 'helvetica neue', helvetica, sans-serif;
              line-height: 21px;
              color: #000000;
              font-size: 14px;
              text-align: center;
            "
          >
            <strong>From: </strong>
            ${createMailtoLink(message.mail_from)}
            <br />
            <strong>To: </strong>
            ${alias.name || ''} ${createMailtoLink(message.rcpt_to)}
          </p>
        </td>
      </tr>
    </table>
  `);
  $('body').append(`
    <p style="border-top: 1px solid black; margin: 10px 0 0; padding: 10px 0 0; font-family: sans-serif;">
      You received this message because ${createMailtoLink(message.mail_from)}
      sent it to ${createMailtoLink(message.rcpt_to)}.
      <br />
      It was forwarded to you because this alias is associated with your account in
      ${createLink('https://masker.at', 'Masker@')}.
      <br />
      If you no longer want to receive emails sent to ${message.rcpt_to},
      you can ${createLink('https://app.masker.at/login', 'log in')}
      and deactivate or delete this alias.
    </p>
  `);
  return $.html();
}

export default function decorateEmail(
  message: IncomingEmail,
  alias: Alias,
): {
  html: string | null;
  text: string;
  subject: string;
} {
  return {
    html: decorateHTML(message, alias),
    text: decorateText(message, alias),
    subject: `${message.subject || '(No subject)'} - via Masker@`,
  };
}
