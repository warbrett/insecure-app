const knex = require('knex')({
  client: 'sqlite3',
  connection: {filename: ':memory:'},
  useNullAsDefault: true
});

module.exports = knex;
