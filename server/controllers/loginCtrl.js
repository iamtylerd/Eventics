const bcrypt = require('bcrypt');
const User = require('../models/user');


module.exports.get = (req, res, err) => {
  let resolvedUser = {};
	User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return new Promise((resolve, reject) => {
          bcrypt.compare(req.body.password, user.password, (err, matches) => {
            if (err) {
              reject(err)
            } else {
              resolvedUser = user
              console.log(user)
              resolve(matches)
            }
          })
        })
      } else {
        console.log("Does not exist")
      }
    })
    .then((matches) => {
      if (matches) {
        req.session.email = req.body.email
        console.log()
        res.json(resolvedUser)
      } else {
        console.log("Passwords do not match")
      }
    })
    .catch(err)
}

module.exports.create = (req, res, err) => {
	console.log("register", req)
    User.findOne({ email: req.body.email })
      .then(user => {
        if (user) {
          res.send('Email is already registered')
        } else {
        	// Create a new promise bcrypt does not support native promises
          return new Promise((resolve, reject) => {
            bcrypt.hash(req.body.password, 15, (err, hash) => {
              if (err) {
                reject(err)
              } else {
              	// Async fires and returns the hashed password
                resolve(hash)
              }
            })
          })
        }
      })
      .then(hash => User.create({ email: req.body.email, password: hash, userName: req.body.username }))
      .then((obj) => res.send(obj))
      .catch(err)
}

module.exports.destroy = (req, res, err) => {
  console.log(req.session)
  req.session.destroy((err) => {
      if (err) throw err
        res.json("Logout")
    })
}
