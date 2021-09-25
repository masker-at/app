import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { User } from '@masker-at/postgres-models';
import { authenticateUserHook, HTTPError, serializeUser } from '@masker-at/http-utils';
import { getSubscriptionManager, PaddleSubscriptionManager } from '@masker-at/payment-utils';
import verifyWebhook from '../hooks/verifyWebhook';

export default async function paddleRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: any }>('/paddle-webhook', { preHandler: verifyWebhook }, async (req, res) => {
    switch (req.body.alert_name) {
      case 'subscription_created': {
        const { userID } = JSON.parse(req.body.passthrough);
        const user = await User.findOne({ id: userID });
        if (!user) break;

        user.paddleID = req.body.subscription_id;
        await user.save();
        break;
      }
      default:
    }
    await res.send('OK');
  });

  app.post<{ Body: { plan: 'MONTHLY' | 'ANNUAL' } }>(
    '/paddle-switch-plan',
    {
      preHandler: authenticateUserHook,
      schema: {
        body: {
          type: 'object',
          properties: {
            plan: { enum: ['MONTHLY', 'ANNUAL'] },
          },
          required: ['plan'],
        },
      },
    },
    async (req, res) => {
      const subscriptionManager = getSubscriptionManager(req.user);
      if (!subscriptionManager || !(subscriptionManager instanceof PaddleSubscriptionManager)) {
        throw new HTTPError('NO_PADDLE_SUBSCRIPTION');
      }
      const subscription = await subscriptionManager?.getSubscription();
      if (!subscription) throw new HTTPError('NO_PADDLE_SUBSCRIPTION');

      const { data } = await axios.post(
        'https://sandbox-vendors.paddle.com/api/2.0/subscription/users/update',
        new URLSearchParams({
          vendor_id: process.env.PADDLE_VENDOR_ID!,
          vendor_auth_code: process.env.PADDLE_VENDOR_AUTH_CODE!,
          subscription_id: req.user.paddleID!.toString(),
          plan_id:
            req.body.plan === 'MONTHLY'
              ? process.env.PADDLE_MONTHLY_PRODUCT_ID!
              : process.env.PADDLE_ANNUAL_PRODUCT_ID!,
        }),
      );
      if (data.success) {
        await res.send(await serializeUser(req.user));
      } else {
        throw new Error(data.error.message);
      }
    },
  );
}
