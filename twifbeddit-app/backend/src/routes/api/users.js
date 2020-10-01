var mongoose = require('mongoose');
const express = require('express');
var router = express.Router();
var auth = require('../auth');
var User = mongoose.model('User');
var passport = require('passport');

//get own user details (auth required)
router.get('/user', auth.required, function(req,res,next){
    User.findById(req.payload.id).then(function(user){
        if(!user){return res.sendStatus(401);}
        return res.json({user: user.toAuthJSON()});
    }).catch(next);
});

//set details for new user
router.post('/users', function(req,res,next){
    var user = new User();
    user.email = req.body.user.email;
    user.password = req.body.user.password;
    user.subscribed = req.body.user.subscribed;     //is this appropriate?
    user.save().then(function(){
        return res.json({user: user.toAuthJSON()});
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
            user.subscribed = req.body.user.password;
        }
        if(typeof req.body.user.subscribed !== 'undefined'){
            user.subscribed = req.body.user.subscribed;
        }
        return user.save().then(function(){
            return res.json({user: user.toAuthJSON()});
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
