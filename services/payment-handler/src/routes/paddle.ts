import { FastifyInstance } from 'fastify';
import { User } from '@masker-at/postgres-models';
import verifyWebhook from '../hooks/verifyWebhook';

export default async function paddleRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: any }>('/paddle', { preHandler: verifyWebhook }, async (req, res) => {
    switch (req.body.alert_name) {
      case 'subscription_created': {
        const { userID } = req.body.passthrough;
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
}
