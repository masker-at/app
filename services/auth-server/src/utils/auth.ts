import crypto from 'crypto';
import { FastifyReply } from 'fastify';
import { Session, User } from '@masker-at/postgres-models';

export interface SignUpBody {
  email: string;
  password: string;
}

export const SignUpBodySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      pattern:
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    },
    password: {
      type: 'string',
      minLength: 2,
    },
  },
  required: ['email', 'password'],
};

export interface LoginBody {
  email: string;
  password: string;
  twoFactorCode?: string;
}

export const LoginBodySchema = {
  type: 'object',
  properties: {
    email: {
      type: 'string',
      pattern:
        '^(([^<>()[\\]\\\\.,;:\\s@"]+(\\.[^<>()[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$',
    },
    password: {
      type: 'string',
      minLength: 2,
    },
    twoFactorCode: {
      type: 'string',
      minLength: 6,
      maxLength: 15,
    },
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
    path: '/',
  });

  await res.send({ csrfToken: session.csrfToken });

  return session;
}
