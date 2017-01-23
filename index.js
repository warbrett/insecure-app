const express = require('express');
const bodyParser = require('body-parser');
const cookieSession = require('cookie-session');

const scaffold = require('./scaffold');
const registerRoutes = require('./routes');

const knex = require('./db');
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('view engine', 'pug');
app.set('views', './views');

app.set('trust proxy', 1);

app.use(cookieSession({
  name: 'user',
  // Lol
  httpOnly: false,
  keys: ['username', 'id']
}));

scaffold()
.then(() => {
  registerRoutes(app);
  app.listen(3124, function () {
    console.log('Insecure express app running on port 3124!');
    knex.select('*').from('users').then(console.log);
  });
});
