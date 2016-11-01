'use strict';

const { json } = require('body-parser')
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routes = require('../server/routes/')
const session = require('express-session')
const RedisStore = require('connect-redis')(session)


const port = process.env.PORT || 3000;
const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://localhost:27017/eventics'



app.locals.user = {email: 'nothing@nothing.com'}
app.locals.body = {}

app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", '*');
 // res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
 // res.header("Access-Control-Allow-Headers", "X-Custom-Header");
 next();
});

app.use(session({
	resave: false,
  saveUninitialized: false,
  store: new RedisStore({
  	url: process.env.REDIS_URL || 'redis://localhost:6379'
  }),
  secret: 'eventics'
}))

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





