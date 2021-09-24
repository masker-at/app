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
    createdAt: string;
  } & (
    | {
        paymentMethod: 'PADDLE';
        paymentDetails: PaddlePaymentDetails;
        subscription: {
          isValid: boolean;
          lastPaymentTime: string;
          validUntil: string;
          plan: 'MONTHLY' | 'ANNUAL';
          cancelURL: string;
          updateURL: string;
        };
      }
    | {
        paymentMethod: null;
        paymentDetails: null;
        subscription: null;
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
    createdAt: user.createdAt.toISOString(),
    ...(isPaddle
      ? {
          paymentMethod: 'PADDLE',
          paymentDetails: (subscription as Subscription<PaddlePaymentDetails>).paymentDetails,
          subscription: {
            isValid: subscription!.isValid,
            lastPaymentTime: subscription!.lastPaymentTime.toISOString(),
            validUntil: subscription!.validUntil.toISOString(),
            plan: subscription!.plan,
            cancelURL: subscription!.cancelURL,
            updateURL: subscription!.updateURL,
          },
        }
      : {
          paymentDetails: null,
          paymentMethod: null,
          subscription: null,
        }),
  };
}
