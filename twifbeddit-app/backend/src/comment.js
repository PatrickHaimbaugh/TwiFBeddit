const mongoose = require('mongoose');
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
    data.post_type = "comment";
    data.image_url = null;
    data.topic = null;
    data.title = null;
    const post = new Post(data);
    const newPost = await post.save();

    const { id } = event.queryStringParameters;
    await Post.findOneAndUpdate({_id: id},  {$addToSet: {comments: newPost._id}});
    return {'statusCode': 200};
};
