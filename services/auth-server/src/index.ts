import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '@masker-at/postgres-models';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify();
  await app.register(fastifyCors);

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
