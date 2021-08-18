import 'reflect-metadata';
import crypto from 'crypto';
import dotenv from 'dotenv';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import { join } from 'path';
import fastifyCors from 'fastify-cors';

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

  app.decorateRequest('user', null);

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
