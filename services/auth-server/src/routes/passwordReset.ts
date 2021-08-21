import { join } from 'path';
import { promises as fs } from 'fs';
import jwt from 'jsonwebtoken';
import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { HTTPError, errorHandler } from '@masker-at/http-utils';
import { User, Session } from '@masker-at/postgres-models';
import { signPasswordResetToken, sendPasswordResetEmail } from '../utils/passwordReset';

export default async function passwordResetRoutes(app: FastifyInstance): Promise<void> {
  const passwordResetForm = await fs.readFile(
    join(__dirname, '../../views/passwordResetForm.html'),
    'utf-8',
  );

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

  app.get<{
    Params: {
      token: string;
    };
  }>(
    '/reset-password/:token',
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
      await res.type('text/html').send(passwordResetForm.replace('%TOKEN%', req.params.token));
    },
  );

  app.post<{
    Body: {
      password: string;
      token: string;
    };
  }>(
    '/submit-password-reset',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            password: { type: 'string', minLength: 2 },
            token: { type: 'string' },
          },
          required: ['password', 'token'],
        },
      },
    },
    async (req, res) => {
      const { password, token } = req.body;
      let userID: number;
      try {
        const result = jwt.verify(token, process.env.EMAIL_VERIFICATION_JWT_SECRET!) as {
          userID: number;
          type: string;
        };
        if (result.type !== 'PASSWORD_RESET') throw new Error();
        ({ userID } = result);
      } catch {
        await res.status(404).send('This link is invalid or expired. Please request a new one');
        return;
      }

      const { affected } = await User.update(
        { id: userID },
        { passwordHash: await argon2.hash(password) },
      );
      if (affected === 0) {
        await res.status(404).send('This link is invalid or expired. Please request a new one');
      } else {
        await res.send('Your password was changed! You can now log in with your new password.');
        await Session.delete({ userId: userID });
      }
    },
  );

  app.setErrorHandler(errorHandler);
}
