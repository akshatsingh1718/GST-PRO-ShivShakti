export default {
  HOST: 'localhost',
  USER: 'pmspro',
  PASSWORD: 'Temp@1718',
  DB: 'shivshakti',
  dialect: 'mysql',
  externals: ['pg', 'sqlite3', 'tedious', 'pg-hstore'],
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
