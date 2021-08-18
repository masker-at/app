import { FastifyRequest } from 'fastify';
import HTTPError from './HTTPError';
import getSession from './getSession';

export default async function authenticateUserHook(req: FastifyRequest): Promise<void> {
  const session = await getSession(req, true);

  if (!session) {
    throw new HTTPError('NOT_AUTHENTICATED');
  }

  req.user = session.user;
}
