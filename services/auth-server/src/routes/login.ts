import crypto from 'crypto';
import { FastifyInstance } from 'fastify';
import argon2 from 'argon2';
import { User, Session } from '@masker-at/postgres-models';
import HTTPError from '../errors/HTTPError';

export default async function loginRoute(app: FastifyInstance): Promise<void> {
  app.post<{
    Body: {
      email: string;
      password: string;
    };
  }>(
    '/login',
    {
      schema: {
        body: {
          type: 'object',
          properties: {
            email: { type: 'string' },
            password: { type: 'string' },
          },
          required: ['email', 'password'],
        },
      },
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

      const session = await Session.create({
        id: crypto.randomBytes(32).toString('hex'),
        user,
        csrfToken: crypto.randomBytes(128).toString('hex'),
      }).save();

      res.setCookie('sid', session.id, {
        domain: 'localhost',
        maxAge: 30 * 24 * 3600,
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        signed: true,
      });

      await res.send({ csrfToken: session.csrfToken });
    },
  );
}
