import { FastifyInstance } from 'fastify';
import axios from 'axios';
import { authenticateUserHook, HTTPError, serializeUser } from '@masker-at/http-utils';
import { getSubscriptionManager, PaddleSubscriptionManager } from '@masker-at/payment-utils';

export default async function paddleRoute(app: FastifyInstance): Promise<void> {
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
        `https://${
          process.env.PADDLE_ENABLE_SANDBOX !== 'false' ? '' : `sandbox-`
        }vendors.paddle.com/api/2.0/subscription/users/update`,
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
