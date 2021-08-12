module.exports = {
  // eslint-disable-next-line global-require
  ...require('./db-credentials'),
  entities: ['dist/entities/*.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
