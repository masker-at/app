import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { User } from '@masker-at/postgres-models';
import { errorHandler, HTTPError } from '@masker-at/http-utils';
import { AuthBody, AuthBodySchema, createAndSendSession } from '../utils/auth';

export default async function loginRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: AuthBody }>(
    '/login',
    {
      schema: { body: AuthBodySchema },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new HTTPError('USER_NOT_FOUND');
      }

      if (!(await argon2.verify(user.passwordHash, password))) {
        throw new HTTPError('INVALID_PASSWORD');
      }

      await createAndSendSession(user, res);
    },
  );

  app.setErrorHandler(errorHandler);
}
