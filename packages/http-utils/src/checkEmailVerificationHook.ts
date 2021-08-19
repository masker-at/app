import { FastifyRequest } from 'fastify';
import HTTPError from './HTTPError';

export default async function authenticateUserHook(req: FastifyRequest): Promise<void> {
  if (!req.user.isEmailVerified) {
    throw new HTTPError('EMAIL_NOT_VERIFIED');
  }
}
