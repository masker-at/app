import { FastifyRequest } from 'fastify';
import HTTPError from '../errors/HTTPError';
import { getSession } from '../utils/auth';

export default async function authenticateUserHook(req: FastifyRequest): Promise<void> {
  const session = await getSession(req, true);

  if (!session) {
    throw new HTTPError('NOT_AUTHENTICATED');
  }

  req.user = session.user;
}
