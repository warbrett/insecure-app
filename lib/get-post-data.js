const knex = require('../db');

function getPostData (user) {
  // A really gross function used to avoid architecting this project well
  return knex('posts')
    .join('users', 'users.id', '=', 'posts.user_id')
    .select(['posts.*', 'users.username'])
    .then(posts => {
      return posts.map(post => {
        if (post.user_id === user.id) {
          return Object.assign({ author: true }, post);
        }
        return post;
      });
    });
}

module.exports = getPostData;
