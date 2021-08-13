import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import fastifyCors from 'fastify-cors';
import errorHandler from './errors/errorHandler';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify();
  await app.register(fastifyCors);

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  app.setErrorHandler(errorHandler);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
