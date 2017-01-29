const getPostData = require('../lib/get-post-data');

function appHandler (req, res) {
  if (!req.session.username) {
    return res.redirect('/');
  }

  getPostData(req.session)
  .then(posts => {
    res.render('app', { posts });
  });
}

module.exports = appHandler;
