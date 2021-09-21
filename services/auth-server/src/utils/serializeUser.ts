import { User } from '@masker-at/postgres-models';
import {
  getSubscriptionManager,
  PaddlePaymentDetails,
  PaddleSubscriptionManager,
  Subscription,
} from '@masker-at/payment-utils';

export default async function serializeUser(user: User): Promise<
  {
    id: number;
    email: string;
    isEmailVerified: boolean;
    lastEmailVerificationSentDate: Date;
    is2FAEnabled: boolean;
  } & (
    | {
        paymentMethod: 'PADDLE';
        paymentDetails: PaddlePaymentDetails;
      }
    | {
        paymentMethod: null;
        paymentDetails: null;
      }
  )
> {
  const subscriptionManager = getSubscriptionManager(user);
  const subscription = await subscriptionManager?.getSubscription();
  const isPaddle = subscriptionManager instanceof PaddleSubscriptionManager && subscription;
  return {
    id: user.id,
    email: user.email,
    isEmailVerified: user.isEmailVerified,
    lastEmailVerificationSentDate: user.lastEmailVerificationSentDate,
    is2FAEnabled: user.is2FAEnabled,
    ...(isPaddle
      ? {
          paymentMethod: 'PADDLE',
          paymentDetails: (subscription as Subscription<PaddlePaymentDetails>).paymentDetails,
        }
      : {
          paymentDetails: null,
          paymentMethod: null,
        }),
  };
}
