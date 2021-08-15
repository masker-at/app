import { FastifyRequest } from 'fastify';
import { Session } from '@masker-at/postgres-models';
import HTTPError from '../errors/HTTPError';

export default async function authenticateUserHook(req: FastifyRequest): Promise<void> {
  const csrfToken = req.headers['x-csrf-token'];
  const sessionCookie = req.cookies.sid ? req.unsignCookie(req.cookies.sid) : null;

  if (!csrfToken || !sessionCookie?.valid || !sessionCookie.value) {
    throw new HTTPError('NOT_AUTHENTICATED');
  }

  const session = await Session.findOne(sessionCookie.value, { relations: ['user'] });
  if (!session || session.csrfToken !== csrfToken) {
    throw new HTTPError('NOT_AUTHENTICATED');
  }

  req.user = session.user;
}
