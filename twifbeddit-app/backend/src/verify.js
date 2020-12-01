const mongoose = require('mongoose');
const User = mongoose.model("User");
const Verify = mongoose.model("Verify");



exports.GET = async (_, event) => {
    if (event.queryStringParameters.uuid == undefined)
        return {'statusCode': 404};

    const v = await Verify.findOne({verification_uuid: event.queryStringParameters.uuid});
    await User.findOneAndUpdate({username: v.username}, {$set: {verified: true}});
    
    return {
        statusCode: 301,
        headers: {
            Location: 'http://twifbeddit-prod.s3-website.us-east-2.amazonaws.com/',
        }
    }
};
