import { FastifyInstance } from 'fastify';
import verifyWebhook from '../hooks/verifyWebhook';

export default async function paddleRoute(app: FastifyInstance): Promise<void> {
  app.post('/paddle', { preHandler: verifyWebhook }, async (req, res) => {
    console.log(req.body);
    await res.send('OK');
  });
}
