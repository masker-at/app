import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { User } from '@masker-at/postgres-models';
import { errorHandler, HTTPError } from '@masker-at/http-utils';
import { LoginBody, LoginBodySchema, createAndSendSession } from '../utils/auth';
import { check2FA } from '../utils/twoFactor';

export default async function loginRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: LoginBody }>(
    '/login',
    {
      schema: { body: LoginBodySchema },
    },
    async (req, res) => {
      const { email, password, twoFactorCode } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
        throw new HTTPError('USER_NOT_FOUND');
      }

      if (!(await argon2.verify(user.passwordHash, password))) {
        throw new HTTPError('INVALID_PASSWORD');
      }

      if (user.is2FAEnabled) {
        if (!twoFactorCode || !check2FA(user, twoFactorCode)) {
          throw new HTTPError('INVALID_2FA_CODE');
        }
      }

      await createAndSendSession(user, res);
    },
  );

  app.setErrorHandler(errorHandler);
}
