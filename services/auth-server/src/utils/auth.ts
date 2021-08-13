import crypto from 'crypto';
import { FastifyReply } from 'fastify';
import { Session, User } from '@masker-at/postgres-models';

export interface AuthBody {
  email: string;
  password: string;
}

export const AuthBodySchema = {
  type: 'object',
  properties: {
    email: { type: 'string' },
    password: { type: 'string' },
  },
  required: ['email', 'password'],
};

export async function createAndSendSession(user: User, res: FastifyReply): Promise<Session> {
  const session = await Session.create({
    id: crypto.randomBytes(32).toString('hex'),
    user,
    csrfToken: crypto.randomBytes(128).toString('hex'),
  }).save();

  void res.setCookie('sid', session.id, {
    domain: 'localhost',
    maxAge: 30 * 24 * 3600,
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    signed: true,
  });

  await res.send({ csrfToken: session.csrfToken });

  return session;
}
