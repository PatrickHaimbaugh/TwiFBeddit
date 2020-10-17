const mongoose = require("mongoose");
const User = mongoose.model("User");
const bcrypt = require("bcryptjs");
const { get_cookie_header } = require("./auth");

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

// TODO: Test this. Gets the topics that the user is following.
exports.get_topics_that_the_user_is_following = async (_, event) => {
    if (event.queryStringParameters != null)
        console.error("Parameters currently ignored");
    const username = await get_user_from_header(event.headers);
    const topics = await User.findOne({username: username}, 'followed_topics');
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            topics: topics
        })
    }
};
