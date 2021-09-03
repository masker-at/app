import 'reflect-metadata';
import { createConnection } from 'typeorm';
import fastify from 'fastify';
import emailRoute from './routes/email';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();

  const app = fastify({ ignoreTrailingSlash: true, bodyLimit: 100 * 1024 * 1024 });

  app.get('/ping', async (req, res) => {
    await res.send('pong');
  });

  await app.register(emailRoute);

  await app.listen(3000, '0.0.0.0');
  console.log('Listening on port 3000');
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
