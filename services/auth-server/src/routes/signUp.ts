import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { User } from '@masker-at/postgres-models';
import HTTPError from '../errors/HTTPError';
import { AuthBody, AuthBodySchema, createAndSendSession } from '../utils/auth';
import { signVerificationToken, sendVerificationEmail } from '../utils/emailVerification';
import errorHandler from '../errors/errorHandler';

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

        const verificationToken = signVerificationToken(user.id);
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
