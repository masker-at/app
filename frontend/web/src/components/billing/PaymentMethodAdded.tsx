import { PaddlePaymentDetails } from '@masker-at/payment-utils';
import { FC } from 'react';
import useMeQuery from '../../api-hooks/useMeQuery';
import useOpenCheckout from '../../hooks/useOpenCheckout';

const READABLE_CARD_NAMES = {
  visa: 'Visa',
  master: 'Mastercard',
  american_express: 'American Express',
  discover: 'Discover',
  jcb: 'JCB',
  maestro: 'Maestro',
  diners_club: 'Diners club',
  unionpay: 'UnionPay',
};

const isCreditCardPaymentDetails = (
  details: PaddlePaymentDetails,
): details is {
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
} => details.type === 'CREDIT_CARD';

const PaymentMethodAdded: FC = () => {
  const { data } = useMeQuery();
  const { paymentMethod, paymentDetails, subscription } = data!;
  const openCheckout = useOpenCheckout();

  switch (paymentMethod) {
    case 'PADDLE':
      return (
        <>
          {Date.parse(subscription!.validUntil) === 0 ? (
            <p>
              Your subscription is cancelled.{' '}
              <button
                type="button"
                className="text-left text-primary-darker underline mr-2"
                onClick={openCheckout}
              >
                Resubscribe
              </button>
            </p>
          ) : (
            <>
              <p>
                <b>Current payment method:</b>{' '}
                {isCreditCardPaymentDetails(paymentDetails!)
                  ? `${READABLE_CARD_NAMES[paymentDetails.cardType]} **** ${
                      paymentDetails.lastFourDigits
                    } ${paymentDetails.expiryDate}`
                  : 'PayPal'}
              </p>
              <p>
                <b>Plan:</b> {subscription!.plan === 'ANNUAL' ? 'Annual' : 'Monthly'}
              </p>
              <p>
                Your next payment will be on{' '}
                {new Date(subscription!.validUntil).toLocaleDateString()}
              </p>
              <div className="flex justify-start">
                {subscription!.isValid && (
                  <button type="button" className="text-left text-primary-darker underline mr-2">
                    Switch to {subscription!.plan === 'MONTHLY' ? 'annual' : 'monthly'}
                  </button>
                )}
                <a
                  className="text-left text-primary-darker underline mr-2"
                  href={subscription!.updateURL}
                >
                  Change payment method
                </a>
                <a className="text-left text-red-600 underline" href={subscription!.cancelURL}>
                  Cancel subscription
                </a>
              </div>
            </>
          )}
        </>
      );

    default:
      return <p>Sorry, something went wrong. Please try again</p>;
  }
};
export default PaymentMethodAdded;
