import EventEmitter from 'events';
import jwt from 'jsonwebtoken';
import PostalAPI from '@masker-at/postal-api';
import { User } from '@masker-at/postgres-models';

const postalAPI = new PostalAPI(process.env.POSTAL_API_BASE_URL!, process.env.POSTAL_API_KEY!);

export function signVerificationToken(user: User): string {
  return jwt.sign(
    {
      type: 'EMAIL_VERIFICATION',
      userID: user.id,
      userEmail: user.email,
    },
    process.env.EMAIL_VERIFICATION_JWT_SECRET!,
    { expiresIn: '1h' },
  );
}

export async function sendVerificationEmail(
  emailAddress: string,
  verificationToken: string,
): Promise<void> {
  await postalAPI.sendMessage({
    from: 'noreply@masker.at',
    to: [emailAddress],
    subject: 'Masker@ - email verification',
    plainBody: `Hello there,

You've just signed up for Masker@ (https://www.masker.at). To verify your email address,
please click the following link:
http://localhost:3000/auth/verify-email/${verificationToken}

The link expires in 1 hour. If you need to request a new one, sign in to your account.

If you didn't sign up for Masker@, please ignore this message - someone probably registered with your email by mistake.
`,
  });
}

export async function sendChangeVerificationEmail(
  emailAddress: string,
  verificationToken: string,
): Promise<void> {
  await postalAPI.sendMessage({
    from: 'noreply@masker.at',
    to: [emailAddress],
    subject: 'Masker@ - email change verification',
    plainBody: `Hello there,

You've just changed your email for Masker@ (https://www.masker.at).
To confirm that this will be your new email address, please click the following link:
http://localhost:3000/auth/verify-email/${verificationToken}

The link expires in 1 hour. If you need to request a new one, sign in to your account.

If you didn't change your email, please contact support.
`,
  });
}

export const emailVerificationEmitter = new EventEmitter();
