require('dotenv').config();
const massive = require('massive');
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const memesController = require('./memes_controller');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 365
  }
}));

massive(process.env.CONNECTION_STRING).then(database => {
  app.set('db', database);
  console.log('database is kickin :call_me_hand:');
}).catch(error => {
  console.log('-------------- database issue', error);
});

app.get(`/auth/callback`, (req, res) => {
  const payload = {
    client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
    client_secret: process.env.AUTH0_CLIENT_SECRET,
    code: req.query.code,
    grant_type: 'authorization_code',
    redirect_uri: `http://${req.headers.host}/auth/callback`
  };

  function tradeCodeForAccessToken() {
    return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload);
  }

  function tradeAccessTokenForUserInfo(accessTokenResponse) {
    const accessToken = accessTokenResponse.data.access_token;
    return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`);
  }

  function storeUserInfoInDatabase(response) {
    const auth0Id = response.data.sub;
    const db = req.app.get('db');
    return db.get_user_by_auth0_id(auth0Id).then(users => {
      if (users.length) {
        const user = users[0];
        req.session.user = user;
        res.redirect('/dashboard');
      } else {
        const userArray = [
          auth0Id,
          response.data.name,
          response.data.email,
          response.data.picture
        ];
        return db.create_user(userArray).then(newUser => {
          req.session.user = newUser;
          res.redirect('/dashboard');
        }).catch(error => {
          console.log('error in db.create_user', error);
          res.status(500).send('Unexpected error');
        });
      }
    }).catch(error => {
      console.log('error in db.get_user_by_auth0_id', error);
      res.status(500).send('Unexpected error');
    });
  }

  tradeCodeForAccessToken()
  .then(tradeAccessTokenForUserInfo)
  .then(storeUserInfoInDatabase)
  .catch(error => {
    console.log('error in /auth/callback', error);
    res.status(500).send('Unexpected error');
  });
});

app.get('/api/memes', memesController.getAll);
app.get('/api/user-data', (req, res) => {
  res.json({ user: req.session.user });
});
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.send();
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} 🚀`);
});

