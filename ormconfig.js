// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, Session, Alias, Email, migrations } = require('./packages/postgres-models/dist');

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./db-credentials'),
  entities: [User, Session, Alias, Email],
  migrations,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
