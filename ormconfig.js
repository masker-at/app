// eslint-disable-next-line @typescript-eslint/no-var-requires
const { User, migrations } = require('./packages/postgres-models/dist');

module.exports = {
  // eslint-disable-next-line global-require
  ...require('./db-credentials'),
  entities: [User],
  migrations,
  cli: {
    migrationsDir: 'src/migrations',
  },
};
