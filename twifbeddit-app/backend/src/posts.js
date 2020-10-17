//const User = require("./mongo").User;
//const Post = require("./mongo").Post;
const mongoose = require('mongoose');
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const { get_user_from_header } = require("./auth");

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    if (data.text == undefined)
        return {'statusCode': 400};
    data.author = await get_user_from_header(event.headers);
    if (data.author == null) {
        console.error("Couldn't get user from cookie");
        return {'statusCode': 403}
    }
    const post = new Post(data);
    const newPost = await post.save();
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            'postId': newPost._id
        })
    }
};

// TODO: Test this. Get posts that a specific user is following, sorts by most recent posts.
exports.GET = async (_, event) => {
    if (event.queryStringParameters != null)
        console.error("Parameters currently ignored");
    const username = await get_user_from_header(event.headers);
    const user = await User.findOne({username: username});
    var posts = await Post.find().where('topic').in(user.followed_topics).limit(8).sort({ createdAt: -1}).exec();
    posts.forEach((post, index, arr) => {
        if (post.anonymous) post.author = null;
        post.anonymous = undefined;
        post.__v = undefined;
        arr[index] = post;
    });

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            posts: posts
        })
    }
};

// TODO: Test this. Returns post under a specific topic, sorts by most recent posts.
exports.get_posts_under_a_specific_topic = async (_, event) => {
    if (event.queryStringParameters != null)
        console.error("Parameters currently ignored");
    const topic = event.queryStringParameters.topic; // is this legal
    var posts = await Post.find().where('topic').in(topic).limit(8).sort({ createdAt: -1}).exec();
    posts.forEach((post, index, arr) => {
        if (post.anonymous) post.author = null;
        post.anonymous = undefined;
        post.__v = undefined;
        arr[index] = post;
    });

    return {
        'statusCode': 200,
        'body': JSON.stringify({
            posts: posts
        })
    }
};
