const mongoose = require('mongoose');
const User = mongoose.model("User");
const Topic = mongoose.model("Topic");

const { get_user_from_header } = require("./auth");

exports.POST = async (_, event) => {

    if (event.queryStringParameters.topicToFollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const topicToFollow = event.queryStringParameters.topicToFollow;  
        const user = await User.findOneAndUpdate({username: username}, {$addToSet: {followed_topics: topicToFollow}}, {new: true});
    
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "followed_topics": user.followed_topics,
            })
        }
    }

    if (event.queryStringParameters.topicToUnfollow != undefined) {
        const username = await get_user_from_header(event.headers);
        const topicToUnfollow = event.queryStringParameters.topicToUnfollow;
        const user = await User.findOneAndUpdate({username: username}, {$pull: {followed_topics: topicToUnfollow}}, {new: true});
  
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                "followed_topics": user.followed_topics,
            })
        }
    }

    return {
        'statusCode': 404
    }

};

exports.GET = async (_, event) => {

    if (event.queryStringParameters == null) {

        var topics = await Topic.find();
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                topics: topics
            })
        }
    } 

    return {
        'statusCode': 404
    }
};
