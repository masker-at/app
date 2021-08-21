import 'reflect-metadata';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import { join } from 'path';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';

dotenv.config({ path: join(__dirname, '../../../.env') });

/* eslint-disable import/first */
import loginRoute from './routes/login';
import signUpRoute from './routes/signUp';
import emailVerificationRoutes from './routes/emailVerification';
import meRoutes from './routes/me';
import settingsRoutes from './routes/settings';
/* eslint-enable import/first */

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify({
    ignoreTrailingSlash: true,
    maxParamLength: 500,
    bodyLimit: 1024,
  });
  await app.register(fastifyCors, {
    credentials: true,
    origin: [/^http:\/\/localhost(:|\/)/, /^https:\/\/(.*\.)?masker.at/],
  });
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('base64'),
  });

  app.decorateRequest('user', null);

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.register(loginRoute);
  await app.register(signUpRoute);
  await app.register(emailVerificationRoutes);
  await app.register(meRoutes);
  await app.register(settingsRoutes);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
