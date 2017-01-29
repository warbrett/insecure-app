const appHandler = require('./handlers/app');
const loginHandler = require('./handlers/login');
const indexHandler = require('./handlers/index');
const postsHandlers = require('./handlers/posts');

function registerRoutes (app) {
  app.get('/', indexHandler);
  app.get('/app', appHandler);
  app.post('/login', loginHandler);

  app.post('/posts', postsHandlers.create);
  app.delete('/posts/:postId', postsHandlers.del);
}

module.exports = registerRoutes;
