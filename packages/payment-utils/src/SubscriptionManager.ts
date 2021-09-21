export interface Subscription<PaymentDetails> {
  lastPaymentTime: Date;
  validUntil: Date;
  isValid(): boolean;
  paymentDetails: PaymentDetails;
}

export default interface SubscriptionManager<PaymentDetails> {
  getSubscription(): Promise<Subscription<PaymentDetails> | null>;
}
