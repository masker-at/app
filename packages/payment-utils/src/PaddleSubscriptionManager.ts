import axios from 'axios';
import { User } from '@masker-at/postgres-models';
import SubscriptionManager, { Subscription } from './SubscriptionManager';

const paddleAuthParams = {
  vendor_id: process.env.PADDLE_VENDOR_ID!,
  vendor_auth_code: process.env.PADDLE_VENDOR_AUTH_CODE!,
};
const paddleClient = axios.create({
  baseURL: 'https://sandbox-vendors.paddle.com/api/2.0/',
});

export type PaddlePaymentDetails =
  | {
      type: 'CREDIT_CARD';
      cardType:
        | 'master'
        | 'visa'
        | 'american_express'
        | 'discover'
        | 'jcb'
        | 'maestro'
        | 'diners_club'
        | 'unionpay';
      lastFourDigits: string;
      expiryDate: string;
    }
  | {
      type: 'PAYPAL';
    };

export default class PaddleSubscriptionManager
  implements SubscriptionManager<PaddlePaymentDetails>
{
  // eslint-disable-next-line no-useless-constructor
  constructor(private user: User & { paddleID: number }) {}

  async getSubscription(): Promise<Subscription<PaddlePaymentDetails> | null> {
    const { data: subscriptionData } = await paddleClient.post(
      'subscription/users',
      new URLSearchParams({ ...paddleAuthParams, subscription_id: this.user.paddleID.toString() }),
    );
    if (!subscriptionData.success) {
      throw new Error(subscriptionData.error.message);
    }
    const [subscription] = subscriptionData.response;
    if (!subscription) return null;

    return {
      lastPaymentTime: new Date(subscription.last_payment.date),
      validUntil: new Date(subscription.next_payment.date),
      isValid() {
        return subscription.state === 'active';
      },
      paymentDetails: {
        type:
          subscription.payment_information.payment_method === 'paypal' ? 'PAYPAL' : 'CREDIT_CARD',
        cardType: subscription.payment_information.card_type,
        lastFourDigits: subscription.payment_information.last_four_digits,
        expiryDate: subscription.payment_information.expiry_date,
      },
    } as Subscription<PaddlePaymentDetails>;
  }
}
