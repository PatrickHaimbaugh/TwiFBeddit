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
    if (data.title == undefined)
        return {'statusCode': 400};
    const post = new Post(data);
    const newPost = await post.save();
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            'postId': newPost._id
        })
    }
};

function createExternalPost(post) {
    post = JSON.parse(JSON.stringify(post));
    if (post.anonymous)
        post.author = null;
    post.anonymous = undefined;
    post.__v = undefined;
}

async function addComments(post) {
    const comments = post.comments;
    post.comments = [];
    for (const commentId of comments) {
        var foundPost = await Post.findById(commentId);
        foundPost = JSON.parse(JSON.stringify(foundPost));
        createExternalPost(foundPost);
        await addComments(foundPost);
        post.comments.push(foundPost);
    }
}

// Returns different posts depending on whether there are query parameters passed in.
exports.GET = async (_, event) => {

    if (event.queryStringParameters == null) {
        const username = await get_user_from_header(event.headers);
        const user = await User.findOne({username: username});
        var posts = await Post.find().where('topic').in(user.followed_topics).sort({ createdAt: -1}).exec();
        posts = JSON.parse(JSON.stringify(posts));
        for (var post of posts) {
            createExternalPost(post);
            await addComments(post);
        }

        return {
            'statusCode': 200,
            'body': JSON.stringify({
                posts: posts
            })
        }
    } 
    if (event.queryStringParameters.topic != undefined) {
        const topic = event.queryStringParameters.topic;
        var posts = await Post.find().where('topic').in(topic).sort({ createdAt: -1}).exec();
        posts = JSON.parse(JSON.stringify(posts));
        for (var post of posts) {
            createExternalPost(post);
            await addComments(post);
        }
    
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                posts: posts
            })
        }

    } 

    if (event.queryStringParameters.author != undefined) {
        const author = event.queryStringParameters.author;
        // find where author and not anonymous
        var posts = await Post.find().where('author').equals(author).where('anonymous').equals(false).sort({ createdAt: -1}).exec();
        posts = JSON.parse(JSON.stringify(posts));
        for (var post of posts) {
            createExternalPost(post);
            await addComments(post);
        }
    
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                posts: posts
            })
        }

    }

    return {
            'statusCode': 404
        }
};
