const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const UserSession = mongoose.model("UserSession");
const bcrypt = require("bcryptjs");
const { get_cookie_header, get_user_from_header } = require("./auth");


exports.create_external_user = (mongo_user) => {
    var user = JSON.parse(JSON.stringify(mongo_user));
    delete user.password;
    delete user._id;
    delete user.__v;
    delete user.postVotes;
    return user;
}

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    var hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    const newUser = new User(data);
    var createdUser = await newUser.save();
    var externalUser = exports.create_external_user(createdUser);
    const cookieHeader = await get_cookie_header(newUser.username);
    externalUser.cookie = cookieHeader["Set-Cookie"];
    return {
        'statusCode': 200,
        'headers': cookieHeader,
        'body': JSON.stringify(externalUser)
    };
};

exports.PATCH = async (_, event) => {

    if (event.queryStringParameters.usernameToFollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToFollow = event.queryStringParameters.usernameToFollow;  
        const user = await User.findOneAndUpdate({username: username}, {$addToSet: {following: usernameToFollow}}, {new: true});
        await User.findOneAndUpdate({username: usernameToFollow}, {$inc : {followers: 1}});

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "following": user.following,
            })
        }
    }

    if (event.queryStringParameters.usernameToUnfollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToUnfollow = event.queryStringParameters.usernameToUnfollow;
        const user = await User.findOneAndUpdate({username: username}, {$pull: {following: usernameToUnfollow}}, {new: true});
        await User.findOneAndUpdate({username: usernameToUnfollow}, {$inc : {followers: -1}});

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "following": user.following,
            })
        }
    }

    var update = event.queryStringParameters;
    if (update.email != undefined)
        update.email = bcrypt.hashSync(event.queryStringParameters.password, 10);
    
    const username = await get_user_from_header(event.headers);
    const updatedUser = await User.findOneAndUpdate({username: username}, {$set: update}, {new: true});

    return {
        'statusCode': 200,
        'body': JSON.stringify(updatedUser)
    };
};

exports.GET = async(_, event) => {
    const {username} = event.queryStringParameters;
    if (username == undefined) {
        console.error("No username specifed for GET /users");
        return {'statusCode': 400};
    }
    var foundUser = await User.findOne({username: username});
    foundUser = this.create_external_user(foundUser);
    delete foundUser.email;
    delete foundUser.savedPosts;
    return {
        'statusCode': 200,
        'body': JSON.stringify(foundUser)
    };
};

exports.DELETE = async (_, event) => {
    const username = await get_user_from_header(event.headers);
    await Post.deleteMany({author: username});
    await UserSession.deleteMany({username: username});
    const user = await User.findOne({username: username});
    await User.updateMany({username: {$in: user.following}}, {$inc : {followers: -1}});
    await user.remove();
    return {'statusCode': 200};
};
