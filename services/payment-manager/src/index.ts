import 'reflect-metadata';
import crypto from 'crypto';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import paddleRoute from './routes/paddle';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify({ ignoreTrailingSlash: true, bodyLimit: 1024 });

  await app.register(fastifyCors, {
    credentials: true,
    origin: [/^http:\/\/localhost(:|\/)/, /^https:\/\/(.*\.)?masker.at/],
  });
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('base64'),
  });

  await app.register(paddleRoute);

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
