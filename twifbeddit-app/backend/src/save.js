const mongoose = require("mongoose");
const User = mongoose.model("User");
const { get_user_from_header } = require("./auth");

exports.POST = async (_, event) => {
    const username = await get_user_from_header(event.headers);
    console.log("Got username " + username);
    console.log("Got postId " + event.queryStringParameters.postId);
    operation = event.queryStringParameters.unsave == 'true' ? '$pull' : '$addToSet';
    change = {};
    change[operation] = {savedPosts: event.queryStringParameters.postId};
    await User.findOneAndUpdate(
        {username: username},
        change,
    ).exec();
    return { 'statusCode': 200 };
};

exports.GET = async (_, event) => {
    const username = await get_user_from_header(event.headers);
    const user = await User.findOne({username: username});
    if (user == null)
        return { 'statusCode': 404 };
    
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            posts: user.savedPosts
        })
    };
};
