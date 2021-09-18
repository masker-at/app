export interface Subscription {
  lastPaymentTime: Date;
  validUntil: Date;
  isValid(): boolean;
}

export default interface SubscriptionManager {
  getSubscription(): Promise<Subscription | null>;
}
