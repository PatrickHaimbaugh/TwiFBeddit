const mongoose = require('mongoose');
const User = mongoose.model("User");
const Verify = mongoose.model("Verify");


exports.GET = async (_, event) => {

    if (event.queryStringParameters.uuid != undefined) {

        const v = await Verify.findOne({verification_uuid: event.queryStringParameters.uuid});
        const userToVerify = await User.findOneAndUpdate({username: v.username}, {$set: {verified: true}}, {new: true});
        
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "email": userToVerify.email,
                "username": userToVerify.username,
                "verified": userToVerify.verified
            })
        }
    }

    return {
        'statusCode': 404
    }

};

