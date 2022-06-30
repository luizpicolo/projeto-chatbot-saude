require('dotenv/config');

module.exports = {
  db: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  },

  redis: {
    pkg: process.env.REDIS_PKG,
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    database: process.env.REDIS_DATABASE,
    options: {
      password: process.env.REDIS_PASSWORD
    },
  }
}