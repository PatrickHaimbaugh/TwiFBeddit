const passport = require('passport');
const LocalStrategy = require('passport-local');
const mongoose = require('mongoose');
const User = mongoose.model('User');

passport.use(new LocalStrategy({
    usernameField: 'user[email]',
    passwordField: 'user[password]'
}, function(email, password, done){
    User.findOne({email: email}).then(function(user){
        user.validPassword(password, function(err, same) {
          if (err){
            return done(null, false, {errors: {"internal error": "please try again"}})
          }else if (!same){
            return done(null, false, {errors: {"email or password":"is invalid."}})
          }else{
            return done(null, user);
          }
        });
    }).catch(done);
}));
