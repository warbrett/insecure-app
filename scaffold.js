const knex = require('./db');

const users = [
  {
    username: 'ted',
    password: 'password',
    type: 'admin',
    ssn: '123-12-1234'
  },
  {
    username: 'brett',
    password: '123456',
    type: 'user',
    ssn: '123-13-1235'
  }
];

const posts = [
  {
    title: 'A post by user 1',
    body: 'lolololol',
    user_id: 1
  },
  {
    title: 'A post by user 2',
    body: 'lololol',
    user_id: 2
  }
];

function scaffold () {
  return knex.schema.createTable('users', function (table) {
    table.increments();
    table.string('username');
    table.string('password');
    table.string('type');
    table.string('ssn');
  })
  .then(() => knex('users').insert(users))
  .then(() => {
    return knex.schema.createTable('posts', function (table) {
      table.increments();
      table.integer('user_id');
      table.string('title');
      table.string('body');
    });
  })
  .then(() => knex('posts').insert(posts));
}

module.exports = scaffold;
