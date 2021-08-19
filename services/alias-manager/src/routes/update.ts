import { FastifyInstance } from 'fastify';
import {
  authenticateUserHook,
  checkEmailVerificationHook,
  errorHandler,
  HTTPError,
} from '@masker-at/http-utils';
import { Alias } from '@masker-at/postgres-models';

export default async function updateRoute(app: FastifyInstance): Promise<void> {
  app.post<{
    Body: {
      name?: string;
      isActive?: boolean;
    };
    Params: {
      id: number;
    };
  }>(
    '/update/:id',
    {
      preHandler: [authenticateUserHook, checkEmailVerificationHook],
      schema: {
        body: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            isActive: { type: 'boolean' },
          },
        },
        params: {
          type: 'object',
          properties: {
            id: { type: 'integer' },
          },
          required: ['id'],
        },
      },
    },
    async (req, res) => {
      const alias = await Alias.findOne(req.params.id);
      if (!alias || alias.userId !== req.user.id) {
        throw new HTTPError('ALIAS_NOT_FOUND');
      }

      if (typeof req.body.name === 'string') alias.name = req.body.name || null;
      if (typeof req.body.isActive === 'boolean') alias.isActive = req.body.isActive;
      await alias.save();

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
