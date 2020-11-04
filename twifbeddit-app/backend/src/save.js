const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const { get_user_from_header } = require("./auth");
const { createExternalPost, addComments, removeComments } = require("./posts");

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

    var posts = await Post.find({_id: {$in: user.savedPosts}});
    posts = JSON.parse(JSON.stringify(posts));
    removeComments(posts);
    for (var post of posts) {
        createExternalPost(post);
        await addComments(post);
    }

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            posts: posts
        })
    };
};
