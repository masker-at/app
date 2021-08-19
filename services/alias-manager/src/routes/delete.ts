import { FastifyInstance } from 'fastify';
import {
  authenticateUserHook,
  checkEmailVerificationHook,
  errorHandler,
  HTTPError,
} from '@masker-at/http-utils';
import { Alias } from '@masker-at/postgres-models';

export default async function deleteRoute(app: FastifyInstance): Promise<void> {
  app.delete<{
    Params: {
      id: number;
    };
  }>(
    '/delete/:id',
    {
      preHandler: [authenticateUserHook, checkEmailVerificationHook],
      schema: {
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

      const response = {
        id: alias.id,
        address: alias.address,
        isActive: alias.isActive,
        name: alias.name,
      };

      alias.user = null;
      await alias.save();

      await res.send(response);
    },
  );

  app.setErrorHandler(errorHandler);
}
