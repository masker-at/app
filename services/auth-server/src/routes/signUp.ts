import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { User } from '@masker-at/postgres-models';
import { HTTPError, errorHandler } from '@masker-at/http-utils';
import { AuthBody, AuthBodySchema, createAndSendSession } from '../utils/auth';
import { signEmailVerificationToken, sendVerificationEmail } from '../utils/emailVerification';

export default async function signUpRoute(app: FastifyInstance): Promise<void> {
  app.post<{ Body: AuthBody }>(
    '/sign-up',
    {
      schema: { body: AuthBodySchema },
    },
    async (req, res) => {
      const { email, password } = req.body;
      const passwordHash = await argon2.hash(password);

      try {
        const user = await User.create({
          email,
          passwordHash,
          lastEmailVerificationSentDate: new Date(),
        }).save();

        const verificationToken = signEmailVerificationToken(user);
        await sendVerificationEmail(email, verificationToken);

        await createAndSendSession(user, res);
      } catch (err) {
        if (err.code === '23505' && err.detail?.startsWith('Key (email)=(')) {
          throw new HTTPError('USER_ALREADY_EXISTS');
        }
        throw err;
      }
    },
  );

  app.setErrorHandler(errorHandler);
}
