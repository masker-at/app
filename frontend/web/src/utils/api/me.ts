import type { PaddlePaymentDetails } from '@masker-at/payment-utils';
import apiClient from './client';

export type User = {
  id: number;
  email: string;
  isEmailVerified: boolean;
  lastEmailVerificationSentDate: string;
  is2FAEnabled: boolean;
  createdAt: string;
} & (
  | {
      paymentMethod: 'PADDLE';
      paymentDetails: PaddlePaymentDetails;
    }
  | {
      paymentMethod: null;
      paymentDetails: null;
    }
);

export default async function me(cookies?: string, csrfToken?: string): Promise<User> {
  const { data } = await apiClient.get('/auth/me', {
    headers: cookies &&
      csrfToken && {
        cookie: cookies,
        'x-csrf-token': csrfToken,
      },
  });
  return data;
}
