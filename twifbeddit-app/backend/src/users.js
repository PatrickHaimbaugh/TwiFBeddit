const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { get_cookie_header } = require("./auth");

exports.create_external_user = (mongo_user) => {
    var user = JSON.parse(JSON.stringify(mongo_user));
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
