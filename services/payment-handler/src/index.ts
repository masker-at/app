import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import fastifyFormBody from 'fastify-formbody';
import paddleRoute from './routes/paddle';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify({ ignoreTrailingSlash: true, bodyLimit: 100 * 1024 * 1024 });

  await app.register(fastifyFormBody);

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
