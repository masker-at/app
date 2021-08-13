import 'reflect-metadata';
import crypto from 'crypto';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import fastifyCookie from 'fastify-cookie';
import loginRoute from './routes/login';
import signUpRoute from './routes/signUp';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify();
  await app.register(fastifyCors);
  await app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET || crypto.randomBytes(32).toString('base64'),
  });

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.register(loginRoute);
  await app.register(signUpRoute);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
