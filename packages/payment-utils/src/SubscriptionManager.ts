export interface Subscription<PaymentDetails> {
  lastPaymentTime: Date;
  validUntil: Date;
  isValid: boolean;
  paymentDetails: PaymentDetails;
  plan: 'MONTHLY' | 'ANNUAL';
  updateURL: string;
  cancelURL: string;
}

export default interface SubscriptionManager<PaymentDetails> {
  getSubscription(): Promise<Subscription<PaymentDetails> | null>;
}
