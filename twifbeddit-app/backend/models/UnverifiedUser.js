const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET_STRING;

const saltRounds = 10;

var UnverifiedUserSchema = new mongoose.Schema({
    createdAt: {type: Date, exprires: 60, default: Date.now},
    email: {type: String, unique: true, required: [true, "cannot be empty."], index: true},
    password: {type: String, required: [true, "cannot be empty."]},
    subscribed: Boolean,
    hash: String
}, {timestamps: true});

UnverifiedUserSchema.plugin(uniqueValidator, {message: "is already taken."});
UnverifiedUserSchema.index({createdAt: 1}, {expireAfterSeconds: 86400});

UnverifiedUserSchema.pre('save', function(next) {
  // Check if document is new or a new password has been set
  if (this.isNew || this.isModified('password')) {
    // Saving reference to this because of changing scopes
    const document = this;
    bcrypt.hash(document.password, saltRounds,
      function(err, hashedPassword) {
      if (err) {
        next(err);
      }
      else {
        document.password = hashedPassword;
        next();
      }
    });
  } else {
    next();
  }
});

UnverifiedUserSchema.methods.validPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    }else{
      callback(err, same);
    }
  });

  //return valid;
};

UnverifiedUserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        password: this.password,
        subscribed: this.subscribed
    };
};

const UnverifiedUser = mongoose.model('UnverifiedUser', UnverifiedUserSchema);
module.exports = UnverifiedUser;
