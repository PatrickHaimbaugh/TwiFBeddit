const jwt = require('express-jwt');

require('dotenv').config();
const secret = process.env.SECRET_STRING;

function getTokenFromHeaders(req){
    if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token'){
        return req.headers.authorization.split(' ')[1];
    }
    return null;
}
var auth = {
    required: jwt({
        secret: secret,
        userProperty: 'payload',
        getToken: getTokenFromHeaders,
        algorithms: ['HS256']
    }),
    optional: jwt({
        secret: secret,
        userProperty: 'payload',
        credentialsRequired: false,
        getToken: getTokenFromHeaders,
        algorithms: ['HS256']
    })
};

module.exports = auth;
