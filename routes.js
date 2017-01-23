const knex = require('./db');

function getPostData (user) {
  // A really gross function used to avoid architecting this project well
  return knex('posts')
    .where({ user_id: user.id })
    .then(posts => {
      return { posts };
    });
}

function registerRoutes (app) {
  app.get('/', (req, res) => {
    res.render('index');
  });

  app.get('/app', (req, res) => {
    if (!req.session.username) {
      return res.redirect('/');
    }

    getPostData(req.session)
      .then(posts => res.render('app', posts));
  });

  app.post('/posts', (req, res) => {
    knex('posts')
    .insert({
      title: req.body.postTitle,
      body: req.body.postBody,
      user_id: req.session.id
    })
    .then(() => getPostData(req.session))
    .then(posts => {
      res.render('app', Object.assign({ msg: 'Post Added!' }, posts));
    });
    // Need to create a post here. Probably shouldn't use CORS for this.
    // No reason to stop scripts from submitting to this url
  });

  app.delete('/posts/:postId', (req, res) => {
    // Delete a post! Should probably check for ownership..
    knex('posts')
    .where({ id: req.params.postId })
    .del()
    .then(() => res.render('app', { msg: 'Post Deleted Successfully!' }))
    .catch(() => res.render('app', { msg: 'Something went wrong...' }));
  });

  app.post('/login', (req, res) => {
    // Surely building queries by hand couldn't go wrong!
    const query = `SELECT * from users WHERE username = '${req.body.username}' AND password = '${req.body.password}'`;
    knex.raw(query)
    .then(([user]) => {
      if (!user) {
        return res.render('index', { err: 'Bad Username or Password' });
      }

      // Obviously if we're returning a user nothing went wrong and everything is dandy!
      req.session.username = user.username;
      req.session.id = user.id;
      res.redirect('/app');
    })
    .catch((err) => {
      console.log('eerror logging in', err);
      return res.render('index', { err: 'Something went wrong, try again?' });
    });
  });
}

module.exports = registerRoutes;
