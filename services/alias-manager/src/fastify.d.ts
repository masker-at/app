import { User } from '@masker-at/postgres-models';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}
