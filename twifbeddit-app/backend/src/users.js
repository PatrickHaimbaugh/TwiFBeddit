const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { get_cookie_header, get_user_from_header } = require("./auth");


exports.create_external_user = (mongo_user) => {
    var user = mongo_user;
    delete user.password;
    delete user._id;
    delete user.__v;
    return user;
}

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    var hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    const newUser = new User(data);
    try {
        var createdUser = await newUser.save();
    } catch (err) {
        console.error(err);
        return {'statusCode': 400};
    }
    return {
        'statusCode': 200,
        'headers': await get_cookie_header(createdUser.username),
        'body': JSON.stringify(exports.create_external_user(createdUser))

    };
};

// TODO: Test this. Unfollow/follow user.
exports.PATCH = async (_, event) => {
    
    if (event.queryStringParameters.usernameToFollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToFollow = event.queryStringParameters.usernameToFollow;  
        const user = await User.findOneAndUpdate({username: username}, {$addToSet: {following: usernameToFollow}}, {new: true});
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "following": user.following
            })
        }
    }

    if (event.queryStringParameters.usernameToUnfollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToUnfollow = event.queryStringParameters.usernameToUnfollow;
        const user = await User.findOneAndUpdate({username: username}, {$pull: {following: usernameToUnfollow}}, {new: true});
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "following": user.following
            })
        }
    }

    return {
        'statuscode': 404
    }

};
