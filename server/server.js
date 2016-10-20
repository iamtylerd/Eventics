'use strict';

const { json } = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('../server/routes/')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)
const passport = require('passport');
const InstagramStrategy = require('passport-instagram');



const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/meantodo'


app.locals.user = {email: 'nothing@nothing.com'}
app.locals.body = {}


//Middleware
app.use(session({
  store: new RedisStore({
  	url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'pizzadescottsupersecretkey'
}))

//Passport
app.use(passport.initialize());
app.use(passport.session());

//Instagram Passport
passport.use(new InstagramStrategy({
    clientID: 'c6a93a0ee6ae452fbf817b9e76967bb6',
    clientSecret: '515aa2118bef4412b977e6ec95cd7b3f',
    callbackURL: "http://127.0.0.1:8100/auth/instagram/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    User.findOrCreate({ instagramId: profile.id }, function (err, user) {
      return done(err, user);
    });
  }
));

//Serializing Functions
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  //Query database or cache here
  done(null, {id: id});
});

app.use((req, res, next) => {
  app.locals.email = req.session && req.session.email
  next()
})

app.use(express.static('client'))
app.use(json())

// routes
app.use(routes)

//Listen
mongoose.Promise = Promise
mongoose.connect(MONGODB_URL, () =>
	app.listen(port, () => console.log(`Listening on port: ${port}`))
	)
