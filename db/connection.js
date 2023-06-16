const knex = require('knex');
require('dotenv').config();

const connection = knex({
  client: process.env.DB_CLIENT || 'mysql',
  connection: process.env.DB_URL ? process.env.DB_URL : {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
});

module.exports = connection;