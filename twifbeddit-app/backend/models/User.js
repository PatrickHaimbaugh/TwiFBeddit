const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

require('dotenv').config();
const secret = process.env.SECRET_STRING;

const saltRounds = 10;

var UserSchema = new mongoose.Schema({
    email: {type: String, unique: true, required: [true, "cannot be empty."], index: true},
    password: {type: String, required: [true, "cannot be empty."]},
    subscribed: Boolean,
    hash: String
}, {timestamps: true});

UserSchema.plugin(uniqueValidator, {message: "is already taken."});

UserSchema.methods.validPassword = function(password, callback){
  bcrypt.compare(password, this.password, function(err, same) {
    if (err) {
      callback(err);
    }else{
      callback(err, same);
    }
  });

  //return valid;
};

UserSchema.methods.generateJWT = function(){
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate()+60);
    return jwt.sign({
        id: this._id,
        email: this.email,
        exp: parseInt(exp.getTime()/1000)
    }, secret)
};
UserSchema.methods.toAuthJSON = function(){
    return {
        email: this.email,
        password: this.password,
        token: this.generateJWT()
    };
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
