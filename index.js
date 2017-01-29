const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const scaffold = require('./scaffold');
const registerRoutes = require('./routes');

const knex = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.set('trust proxy', 1);

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', `script-src 'unsafe-eval' 'unsafe-inline' 'self'`);
  res.setHeader('X-XSS-Protection', 0);
  return next();
});

app.use(cookieSession({
  name: 'user',
  httpOnly: false,
  keys: ['username', 'id']
}));

scaffold()
.then(() => {
  registerRoutes(app);
  app.listen(3124, function () {
    console.log('Insecure express app running on port 3124!');
  });
});
