var Post = require("./mongo").Post;

// need to specify path
exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    const newPost = new Post(data);
    try {
        var createdPost = await newPost.save();
    } catch (err) {
        return {'statusCode': 400};
    }
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            createdPost
        })
    }

}