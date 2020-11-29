const mongoose = require('mongoose');
const Post = mongoose.model("Post");
const { get_user_from_header } = require("./auth");
const { createExternalPost, addComments } = require("./posts");

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    if (data.text == undefined)
        return {'statusCode': 400};
    data.author = await get_user_from_header(event.headers);
    if (data.author == null) {
        console.error("Couldn't get user from cookie");
        return {'statusCode': 403}
    }
    data.post_type = "comment";
    data.image_url = null;
    data.topic = null;
    data.title = null;
    const post = new Post(data);
    const newPost = await post.save();

    const { id } = event.queryStringParameters;
    var updatedPost  = await Post.findOneAndUpdate({_id: id},  {$addToSet: {comments: newPost._id}}, {new: true});
    updatedPost = JSON.parse(JSON.stringify(updatedPost));
    createExternalPost(updatedPost);
    await addComments(updatedPost);
    return {'statusCode': 200, 'body': JSON.stringify({
        'updatedPost': updatedPost
    })};
};


exports.GET = async (_, event) => {

    if (event.queryStringParameters.author == undefined) {
        console.error("Please include the parameter with an author");
        return {'statusCode': 403}
    }

    var comments = await Post.find().where('author').equals(event.queryStringParameters.author).where('post_type').equals('comment').sort({ createdAt: -1}).exec();
    return {'statusCode': 200, 'body': JSON.stringify({
        'comments': comments
    })};

};