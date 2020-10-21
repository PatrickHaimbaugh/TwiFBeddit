const { get } = require("mongoose");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const Post = mongoose.model("Post");
const { get_user_from_header } = require("./auth");


exports.POST = async (_, event) => {
    const { postId, action } = event.queryStringParameters;
    var username = await get_user_from_header(event.headers);
    var user = await User.findOne({username: username});

    const get_body = async (post) => {
        if (post == undefined)
            post = await Post.findOne({_id: postId});
        const res = {
            userUpVoted: user.postVotes.get(postId) == "up",
            userDownVoted: user.postVotes.get(postId) == "down",
            numUp: post.upvotes,
            numDown: post.downvotes,
        };
        return JSON.stringify(res);
    };

    var update = {
        $inc: {},
    };

    const un = ["unup", "undown"].includes(action);
    if (!["up", "down"].includes(action) && !un)
        return {'statusCode': 409, 'body': await get_body()};

    if (un) {
        const unaction = action.slice(2);
        console.log(user.postVotes.get(postId) == undefined);
        if (user.postVotes.get(postId) == undefined || user.postVotes.get(postId) != unaction)
            return {'statusCode': 409, 'body': await get_body()};

        update.$inc[unaction + "votes"] = -1;
        user.postVotes.set(postId, undefined);
    } else {
        const opposite = {up: "down", down: "up"};
        if (user.postVotes.get(postId) != undefined && user.postVotes.get(postId) != opposite[action])
            return {'statusCode': 409, 'body': await get_body()};

        if (user.postVotes.get(postId) == opposite[action])
            update.$inc[opposite[action] + "votes"] = -1;
        update.$inc[action + "votes"] = 1;
        user.postVotes.set(postId, action);
    }

    user.save();
    const newPost = await Post.findOneAndUpdate({_id: postId}, update, {returnOriginal: false});
    return {
        'statusCode': 200,
        'body': await get_body(newPost)
    }
};
