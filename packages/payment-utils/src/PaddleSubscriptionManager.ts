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

export default class PaddleSubscriptionManager implements SubscriptionManager {
  // eslint-disable-next-line no-useless-constructor
  constructor(private user: User & { paddleID: number }) {}

  async getSubscription(): Promise<Subscription | null> {
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
    } as Subscription;
  }
}
