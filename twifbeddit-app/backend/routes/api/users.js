var mongoose = require('mongoose');
const express = require('express');
var router = express.Router();

var auth = require('../auth');
var UnverifiedUser = mongoose.model('UnverifiedUser');
var User = mongoose.model('User');
var passport = require('passport');

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: process.env.TRANSPORT_SERVICE,
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS
  }
});

var urlCrypt = require('url-crypt')('~{ry*I)==yU/]9<7DPk!Hj"R#:-/Z7(hTBnlRS=4CXF');

//get own user details (auth required)
router.get('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

//set details for new user (unverified)
router.post('/unverified/new', function(req,res,next){
    //check to see if email is in users db and let user know they already have an account
    User.findOne({email: req.body.user.email}).then(function(user){
      if (!user){
        var unverifiedUser = new UnverifiedUser();
        unverifiedUser.email = req.body.user.email;
        unverifiedUser.password = req.body.user.password;
        unverifiedUser.subscribed = req.body.user.subscribed;
        unverifiedUser.save().then(function(){
            console.log("first: " + unverifiedUser.id);
            var encryptedUserId = urlCrypt.cryptObj(unverifiedUser.id);
            console.log("encrypted id")
            var mailOptions = {
              from: process.env.NODEMAILER_USER,
              to: unverifiedUser.email,
              subject: 'TwiFBeddit account confirmation link',
              text: 'Thank you for choosing to sign up with TwiFBeddit! You are on your way to making a global difference. Your confirmation email is: http://localhost:3000/verify/' + encryptedUserId + ', and will expire within 24 hours.'
            };
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                console.log('Email sent: ' + info.response);
              }
            });

            return res.json({user: unverifiedUser.toAuthJSON()});
        }).catch(next);
      }else{
        return res.json({errors:{email: "is already taken."}});
      }
    }).catch(next);
});

//set details for new user (upon clicking verification link)
  //use token to find user in unverifiedUsers db
  //copy details of that into new User() object and save to users db
  //delete from unverifiedUsers db
router.post('/new/:id', function(req,res,next){
    var unencryptedUserId = urlCrypt.decryptObj(req.params.id);
    console.log("return: " + unencryptedUserId);
    UnverifiedUser.findById(unencryptedUserId).then(function(unverifiedUser){
        if(!unverifiedUser){return res.sendStatus(401);}

        var user = new User();
        user.email = unverifiedUser.email;
        user.password = unverifiedUser.password;
        user.subscribed = unverifiedUser.subscribed;
        UnverifiedUser.remove( {"_id": unencryptedUserId}).then(
          user.save().then(function(){
              return res.json({user: user.toAuthJSON()});
          })
        );

        //UnverifiedUser.find({id: req.params.id}).remove().exec(); //make sure this doesn't fuck things up

    }).catch(next);

});

//allow user to login
router.post('/users/login', function(req,res,next){
    if(!req.body.user.email){
        return res.status(422).json({errors: {email: "can't be blank."}});
    }
    if(!req.body.user.password){
        return res.status(422).json({errors: {password: "can't be blank."}});
    }
    passport.authenticate('local', {session: false}, function(err, user, info){
        if(err){
          console.log(err);
          return next(err);
        }
        if(user){
            user.token = user.generateJWT();
            return res.json({user: user.toAuthJSON()});
        } else {
            return res.status(422).json(info);
        }
    })(req,res,next)
});

//update user information
router.put('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        if(typeof req.body.user.email !== 'undefined'){
            user.email = req.body.user.email;
        }
        if(typeof req.body.user.password !== 'undefined'){
            user.password = req.body.user.password;
        }
        if(req.body.user.subscribed){
            user.subscribed = req.body.user.subscribed;
        }
        return user.save().then(function(){
            return res.json({user: user.toAuthJSON()});
            //TODO update value of cookie here
        });
    }).catch(next);
});

//middleware to catch user errors in logging inspect
router.use(function(err,req,res,next){
    if(err.name === 'ValidationError'){
        return res.json({
            errors: Object.keys(err.errors).reduce(function(errors ,key){
                errors[key] = err.errors[key].message;
                return errors;
            }, {})
        })
    }
    return next(err);
});

module.exports = router;
