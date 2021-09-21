import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { Not } from 'typeorm';
import { errorHandler, authenticateUserHook, HTTPError } from '@masker-at/http-utils';
import { Session } from '@masker-at/postgres-models';
import {
  signEmailVerificationToken,
  sendChangeVerificationEmail,
} from '../utils/emailVerification';
import serializeUser from '../utils/serializeUser';

export default async function settingsRoutes(app: FastifyInstance): Promise<void> {
  app.post<{
    Body: {
      email: string;
    };
  }>(
    '/update-email',
    {
      preHandler: authenticateUserHook,
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
      req.user.email = req.body.email;
      req.user.isEmailVerified = false;
      req.user.lastEmailVerificationSentDate = new Date();
      req.user.hasChangedEmail = true;

      try {
        await req.user.save();
      } catch (err) {
        if (err.code === '23505' && err.detail?.startsWith('Key (email)=(')) {
          throw new HTTPError('USER_ALREADY_EXISTS');
        }
        throw err;
      }

      const verificationToken = signEmailVerificationToken(req.user);
      await sendChangeVerificationEmail(req.user.email, verificationToken);

      await res.send(await serializeUser(req.user));
    },
  );

  app.post<{
    Body: {
      currentPassword: string;
      newPassword: string;
    };
  }>(
    '/update-password',
    {
      preHandler: authenticateUserHook,
      schema: {
        body: {
          type: 'object',
          properties: {
            currentPassword: {
              type: 'string',
              minLength: 2,
            },
            newPassword: {
              type: 'string',
              minLength: 2,
            },
          },
          required: ['currentPassword', 'newPassword'],
        },
      },
    },
    async (req, res) => {
      if (!(await argon2.verify(req.user.passwordHash, req.body.currentPassword))) {
        throw new HTTPError('INVALID_PASSWORD');
      }

      req.user.passwordHash = await argon2.hash(req.body.newPassword);
      await req.user.save();

      const { value } = req.unsignCookie(req.cookies.sid);
      await Session.delete({ user: req.user, id: Not(value!) });

      await res.send(await serializeUser(req.user));
    },
  );

  app.setErrorHandler(errorHandler);
}
