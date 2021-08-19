import { FastifyInstance } from 'fastify';
import {
  authenticateUserHook,
  checkEmailVerificationHook,
  errorHandler,
} from '@masker-at/http-utils';
import { Alias } from '@masker-at/postgres-models';
import generateAliasUsername from '../utils/generateAliasUsername';

export default async function createRoute(app: FastifyInstance): Promise<void> {
  app.post<{
    Body: {
      name?: string;
    };
  }>(
    '/create',
    {
      preHandler: [authenticateUserHook, checkEmailVerificationHook],
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
          },
        },
      },
    },
    async (req, res) => {
      const alias = Alias.create({
        user: req.user,
        name: req.body.name || undefined,
      });
      let isAliasInserted = false;
      while (!isAliasInserted) {
        alias.address = `${generateAliasUsername()}@masker.at`;
        try {
          // eslint-disable-next-line no-await-in-loop
          await alias.save();
          isAliasInserted = true;
        } catch (err) {
          if (err.code !== '23505' || !err.detail?.startsWith('Key (address)=(')) {
            throw err;
          }
        }
      }
      await res.send({
        id: alias.id,
        address: alias.address,
        isActive: alias.isActive,
        name: alias.name,
      });
    },
  );

  app.setErrorHandler(errorHandler);
}
