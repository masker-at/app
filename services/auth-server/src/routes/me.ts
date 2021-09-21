import { FastifyInstance } from 'fastify';
import { errorHandler, authenticateUserHook, getSession } from '@masker-at/http-utils';
import serializeUser from '../utils/serializeUser';

export default async function meRoutes(app: FastifyInstance): Promise<void> {
  app.get('/verify-session', async (req, res) => {
    const session = await getSession(req, false);
    await res.send({
      isValid: !!session,
      userID: session?.userId,
    });
  });

  app.get('/me', { preHandler: authenticateUserHook }, async (req, res) => {
    await res.send(await serializeUser(req.user));
  });

  app.setErrorHandler(errorHandler);
}
