import { User } from '@masker-at/postgres-models';

declare module 'fastify' {
  interface FastifyRequest {
    user: User;
  }
}

export { default as HTTPError } from './HTTPError';
export { default as getSession } from './getSession';
export { default as errorHandler } from './errorHandler';
export { default as authenticateUserHook } from './authenticateUserHook';
export { default as checkEmailVerificationHook } from './checkEmailVerificationHook';
export { default as serializeUser } from './serializeUser';
