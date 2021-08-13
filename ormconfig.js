// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, Session, migrations } = require('./packages/postgres-models/dist');

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./db-credentials'),
  entities: [User, Session],
  migrations,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
