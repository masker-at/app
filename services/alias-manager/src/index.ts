import 'reflect-metadata';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import { join } from 'path';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import listRoute from './routes/list';
import createRoute from './routes/create';
import updateRoute from './routes/update';
import deleteRoute from './routes/delete';

dotenv.config({ path: join(__dirname, '../../../.env') });

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

  await app.register(listRoute);
  await app.register(createRoute);
  await app.register(updateRoute);
  await app.register(deleteRoute);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
