const knex = require('../db');

function loginHandler (req, res) {
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
  .catch(() => {
    return res.render('index', { err: 'Something went wrong, try again?' });
  });
}

module.exports = loginHandler;
