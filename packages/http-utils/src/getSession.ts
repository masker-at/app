import { FastifyRequest } from 'fastify';
import { Session } from '@masker-at/postgres-models';
import 'fastify-cookie';

export default async function getSession(
  req: FastifyRequest,
  includeUser = false,
): Promise<Session | null> {
  const csrfToken = req.headers['x-csrf-token'];
  const sessionCookie = req.cookies.sid ? req.unsignCookie(req.cookies.sid) : null;

  if (!csrfToken || !sessionCookie?.valid || !sessionCookie.value) {
    return null;
  }

  const session = await Session.findOne(sessionCookie.value, {
    relations: includeUser ? ['user'] : [],
  });
  if (!session || session.csrfToken !== csrfToken) {
    return null;
  }
  return session;
}
