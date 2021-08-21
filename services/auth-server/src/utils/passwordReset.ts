import jwt from 'jsonwebtoken';
import { User } from '@masker-at/postgres-models';
import postalAPI from './postalAPI';

export function signPasswordResetToken(user: User): string {
  return jwt.sign(
    {
      type: 'PASSWORD_RESET',
      userID: user.id,
    },
    process.env.EMAIL_VERIFICATION_JWT_SECRET!,
    { expiresIn: '1h' },
  );
}

export async function sendPasswordResetEmail(
  emailAddress: string,
  verificationToken: string,
): Promise<void> {
  await postalAPI.sendMessage({
    from: 'noreply@masker.at',
    to: [emailAddress],
    subject: 'Masker@ - password reset',
    plainBody: `Hello there,

You've just requested a password reset for Masker@. To change your password, please visit the following link:
http://localhost:3000/auth/reset-password/${verificationToken}

The link expires in 1 hour. If you need to request a new one, please use the login form.

If you didn't request a password reset, please ignore this message - someone probably entered your email by mistake.
`,
  });
}
