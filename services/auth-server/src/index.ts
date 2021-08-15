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
/* eslint-enable import/first */

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify({
    ignoreTrailingSlash: true,
    maxParamLength: 500,
    bodyLimit: 1024,
  });
  await app.register(fastifyCors);
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('base64'),
  });

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.register(loginRoute);
  await app.register(signUpRoute);
  await app.register(emailVerificationRoutes);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
