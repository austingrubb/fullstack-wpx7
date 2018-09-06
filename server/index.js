const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const axios = require('axios');
const massive = require('massive')
const mC = require('./memes_controller')
require('dotenv').config();

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
    app.set('db', database)
    console.log('database is kicking')
}).catch(error => {
    console.log('database issue')
})

app.get('/api/memes', mC.getAll);
app.get('/api/user-data', (req,res) => {
    res.json({user: req.session.user})
})
app.post('/api/logout', (req, res) => {
    req.session.destroy();
    res.send()
})

app.get('/auth/callback', (req, res) => {
    const payload = {
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        client_secret: process.env.AUTH0_CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    }
    function tradeCodeForAccessToken(){
        return axios.post(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/oauth/token`, payload)
    }
    function exchangeAccessTokenForUserInfo(accessTokenResponse){
        const accessToken = accessTokenResponse.data.access_token
        return axios.get(`https://${process.env.REACT_APP_AUTH0_DOMAIN}/userinfo?access_token=${accessToken}`) 
    }
    function storeUserInfoInDataBase(response) {
        const auth0Id = response.data.sub;
        const db = req.app.get('db')
        console.log(userInfoResponse.data)
        return db.get_user_by_auth0_id(auth0Id).then(users => {
          if(users.length){
            const user = users[0];
            req.session.user = user;
            res.redirect("/dashboard");
          }else{
            console.log(userInfoResponse.data)
            const userArray = [
              auth0Id,
              response.data.name,
              response.data.email,
              response.data.picture
            ]
            return db.create_user(userArray).then(newUser => {
              req.session.user = newUser;
              res.redirect("/dashboard");
            }).catch(error => {
              console.log('error with create_user',error)
              res.status(500).send('an error has happened1')
            })
          }
        }).catch(error => {
          console.log('error with find_user_by_auth0_id',error)
          res.status(500).send('an error has happened2')
        })
      }
      tradeCodeForAccessToken()
        .then(exchangeAccessTokenForUserInfo)
        .then(storeUserInfoInDataBase)
        .catch(error => {
            console.log('error', error)
            res.status(500).send('error on server during auth')
  });
})


const port = 4000;
app.listen(port, () => { console.log(`Server listening on port ${port}`); });