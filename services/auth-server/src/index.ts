import 'reflect-metadata';
import { createConnection } from 'typeorm';
import { User } from '@masker-at/postgres-models';

(async () => {
  const connection = await createConnection();
  await connection.runMigrations();
  console.log(connection.options);
  console.log(await User.find());
  await User.create({
    email: 'hello@hello.com',
    passwordHash: 'hash',
  }).save();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
