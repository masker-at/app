import { User } from '@masker-at/postgres-models';

export default function serializeUser(user: User): {
  id: number;
  email: string;
  isEmailVerified: boolean;
  lastEmailVerificationSentDate: Date;
} {
  return {
    id: user.id,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    lastEmailVerificationSentDate: user.lastEmailVerificationSentDate,
  };
}
