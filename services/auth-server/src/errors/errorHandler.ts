import { FastifyRequest, FastifyReply } from 'fastify';
import HTTPError from './HTTPError';

export default async function errorHandler(
  err: Error,
  req: FastifyRequest,
  res: FastifyReply,
): Promise<void> {
  if (err instanceof HTTPError) {
    await res.status(err.httpStatus).send(err);
  } else {
    console.error(err);
    await res.status(500).send(new HTTPError('INTERNAL_SERVER_ERROR'));
  }
}
