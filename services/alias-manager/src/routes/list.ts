import { FastifyInstance } from 'fastify';
import {
  authenticateUserHook,
  checkEmailVerificationHook,
  errorHandler,
} from '@masker-at/http-utils';
import { Alias } from '@masker-at/postgres-models';
import serializeAlias from '../utils/serializeAlias';

export default async function listRoute(app: FastifyInstance): Promise<void> {
  app.get<{
    Querystring: {
      skip?: number;
      limit?: number;
    };
  }>(
    '/list',
    {
      schema: {
        querystring: {
          type: 'object',
          properties: {
            skip: { type: 'integer', minimum: 0 },
            limit: { type: 'integer', exclusiveMinimum: 0 },
          },
        },
      },
      preHandler: [authenticateUserHook, checkEmailVerificationHook],
    },
    async (req, res) => {
      const aliases = await Alias.find({
        where: { user: req.user },
        skip: req.query.skip,
        take: req.query.limit,
        order: {
          isActive: 'DESC',
          createdAt: 'DESC',
        },
      });
      await res.send(aliases.map(serializeAlias));
    },
  );

  app.setErrorHandler(errorHandler);
}
