const knex = require('../db');
const getPostData = require('../lib/get-post-data');

function create (req, res) {
  knex('posts')
  .insert({
    title: req.body.postTitle,
    body: req.body.postBody,
    user_id: req.session.id
  })
  .then(() => getPostData(req.session))
  .then((posts) => {
    const data = {
      msg: 'Post Added',
      posts
    };
    res.render('app', data);
  });
}

function del (req, res) {
  knex('posts')
  .where('id', req.params.postId)
  .del()
  .then((result) => {
    res.status(204).end();
  })
  .catch(() => res.status(500).end());
}

module.exports = {
  create,
  del
};
