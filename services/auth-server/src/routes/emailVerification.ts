import { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import { User } from '@masker-at/postgres-models';
import authenticateUserHook from '../hooks/authenticateUser';
import errorHandler from '../errors/errorHandler';
import HTTPError from '../errors/HTTPError';
import { signVerificationToken, sendVerificationEmail } from '../utils/emailVerification';

export default async function emailVerificationRoutes(app: FastifyInstance): Promise<void> {
  app.get<{
    Params: {
      token: string;
    };
  }>(
    '/verify-email/:token',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            token: { type: 'string' },
          },
          required: ['token'],
        },
      },
    },
    async (req, res) => {
      let userID: number;
      try {
        const result = jwt.verify(req.params.token, process.env.EMAIL_VERIFICATION_JWT_SECRET!) as {
          userID: number;
          type: string;
        };
        if (result.type !== 'EMAIL_VERIFICATION') throw new Error();
        ({ userID } = result);
      } catch {
        await res.status(404).send('Not found'); // TODO: Add HTML page
        return;
      }

      const { affected } = await User.update(userID, { isEmailVerified: true });
      if (affected === 0) {
        await res.status(404).send('Not found'); // TODO: Add HTML page
      } else {
        await res.send(
          'Thanks for verifying your email!\nFeel free to close this page and return to Masker@.',
        );
      }
    },
  );

  app.post('/resend-email', { preHandler: authenticateUserHook }, async (req, res) => {
    if (req.user.isEmailVerified) {
      throw new HTTPError('EMAIL_ALREADY_VERIFIED');
    }

    if (Date.now() - req.user.lastEmailVerificationSentDate.getTime() < 60000) {
      throw new HTTPError('VERIFICATION_COUNTDOWN_NOT_FINISHED');
    }

    const verificationToken = signVerificationToken(req.user.id);
    await sendVerificationEmail(req.user.email, verificationToken);

    req.user.lastEmailVerificationSentDate = new Date();
    await req.user.save();

    await res.send({ lastEmailVerificationSentDate: req.user.lastEmailVerificationSentDate });
  });

  app.setErrorHandler(errorHandler);
}
