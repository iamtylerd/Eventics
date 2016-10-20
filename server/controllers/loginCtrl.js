const passport = require('passport');
const InstagramStrategy = require('passport-instagram');

module.exports.create = passport.authenticate('instagram', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log(res)
    res.redirect('/');
}
