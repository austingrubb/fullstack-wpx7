# Full Stack Review WPX7

# Server

## Packages

* express
* body-parser
* axios
* dotenv
* express-session
* massive

## File structure

* server folder
* controllers
  * memes
* index file
* add a `main` to `package.json`
  * proxy
    * remember special proxy for use with Auth0
* middlewares?
* db folder
  * init.sql

## Routes

* /auth/callback
* /logout
* /user-data
* /api/memes GET (and POST if time)
* /api/memes/:id PATCH/DELETE if time

# Client

## Packages

* redux
* react-redux
* react-router-dom
* axios

## Components

* Header
* Dashboard
* Home
* Memes
* Login?
* Meme

## Redux

* reducer
* store
* Provider wrapper
* action creators
  * type
  * payload
* action types/names
* initial state
  * user
  * memes list

## Routes

* Home /
* Dashboard /dashboard
* Memes list /memes

# Database

* memes
  * id
  * url
  * title
  * text caption?
  * who posted it (user_id)
  * date
  * type
* users
  * id
  * auth0_id
  * name
  * email
  * picture
  * address?
  * nickname

* ~~get_memes_by_user_id~~
* ~~get_user_by_auth0_id~~
* ~~create_user~~
* delete_meme?
* update_meme?
