import { FastifyInstance } from 'fastify';
import { HTTPError, errorHandler } from '@masker-at/http-utils';
import { User } from '@masker-at/postgres-models';
import { signPasswordResetToken, sendPasswordResetEmail } from '../utils/passwordReset';

export default async function passwordResetRoutes(app: FastifyInstance): Promise<void> {
  app.post<{
    Body: {
      email: string;
    };
  }>(
    '/send-password-reset',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              pattern:
                '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
            },
          },
          required: ['email'],
        },
      },
    },
    async (req, res) => {
      const user = await User.findOne({ email: req.body.email });

      if (!user) {
        throw new HTTPError('USER_NOT_FOUND');
      }

      if (Date.now() - user.lastPasswordResetSentDate.getTime() < 60000) {
        throw new HTTPError('VERIFICATION_COUNTDOWN_NOT_FINISHED');
      }

      user.lastPasswordResetSentDate = new Date(Date.now() + 60000);
      await user.save();

      const token = signPasswordResetToken(user);
      await sendPasswordResetEmail(user.email, token);

      await res.send({ lastPasswordResetSentDate: user.lastPasswordResetSentDate });
    },
  );

  app.setErrorHandler(errorHandler);
}
