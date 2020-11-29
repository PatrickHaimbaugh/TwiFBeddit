const mongoose = require('mongoose');
const User = mongoose.model("Post");
const { get_user_from_header } = require("./auth");

exports.POST = async (_, event) => {
    const { toBlock } = event.queryStringParameters;
    if (toBlock == undefined)
        return {'statusCode': 400};

    const username = await get_user_from_header(event.headers);
    
    await User.findOneAndUpdate({username: username}, {$addToSet: {blocked: toBlock}});
    return {'statusCode': 200};
};
