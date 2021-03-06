const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const Verify = mongoose.model("Verify");
const UserSession = mongoose.model("UserSession");
const bcrypt = require("bcryptjs");
const { get_cookie_header, get_user_from_header } = require("./auth");
const { v4: uuidv4 } = require('uuid');
const { send_email } = require("./email");

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
    var newUser = new User(data);

    const uuid = uuidv4();
    const verificationLink = "https://yfe9h86dc9.execute-api.us-east-2.amazonaws.com/Prod/verify?uuid=" + uuid;
    try {
        await send_email(newUser.email,
                "Please verify your TwiFBeddit account", "Please click this link to verify your account: " + verificationLink
            );
        const verifyUUID = new Verify({email: newUser.email, username: newUser.username, verification_uuid: uuid});
        await verifyUUID.save();
    } catch (err) {
        console.log(`${newUser.email} not verified to send emails to`);
        newUser.verified = true;
    }

    const createdUser = await newUser.save();
    const cookieHeader = await get_cookie_header(newUser.username);
    var externalUser = exports.create_external_user(createdUser);
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

    if (event.queryStringParameters.allowDmFromNotFollowed != undefined) {
        const allowDmFromNotFollowed = event.queryStringParameters.allowDmFromNotFollowed;
        const username = await get_user_from_header(event.headers);
        const user = await User.findOneAndUpdate(
            {username: username},
            {allowDmFromNotFollowed: allowDmFromNotFollowed == "true"},
            {new: true}
        );
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "user": user
            })
        };
    }

    if (event.queryStringParameters.usernameToBlock != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToBlock = event.queryStringParameters.usernameToBlock;
        const user = await User.findOneAndUpdate(
            {username: username},
            {$push: {blocked: usernameToBlock}},
            {new: true}
        );
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "blocked": user.blocked
            })
        };
    }
    if (event.queryStringParameters.usernameToUnBlock != undefined) {
        const username = await get_user_from_header(event.headers);
        const usernameToUnBlock = event.queryStringParameters.usernameToUnBlock;
        const user = await User.findOneAndUpdate(
            {username: username},
            {$pull: {blocked: usernameToUnBlock}},
            {new: true}
        );
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "blocked": user.blocked
            })
        };
    }

    var update = event.queryStringParameters;
    if (update.password != undefined)
        update.password = bcrypt.hashSync(event.queryStringParameters.password, 10);
    
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
