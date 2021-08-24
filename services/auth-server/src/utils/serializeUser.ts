import { User } from '@masker-at/postgres-models';

export default function serializeUser(user: User): {
  id: number;
  email: string;
  isEmailVerified: boolean;
  lastEmailVerificationSentDate: Date;
  is2FAEnabled: boolean;
} {
  return {
    id: user.id,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    lastEmailVerificationSentDate: user.lastEmailVerificationSentDate,
    is2FAEnabled: user.is2FAEnabled,
  };
}
