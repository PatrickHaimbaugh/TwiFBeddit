const mongoose = require('mongoose');
const Message = mongoose.model("Message");
const User = mongoose.model("User");
const Conversation = mongoose.model("Conversation");
const { get_user_from_header } = require("./auth");

exports.GET = async (_, event) => {
    const username = await get_user_from_header(event.headers);
    const dms = await Conversation.find({con_id: {$regex: `.*${username}.*`}});
    var conversations = {};
    dms.forEach((dm) => {
        dm = JSON.parse(JSON.stringify(dm));
        console.log(dm);
        const from = dm.con_id.split(',').filter(v => v != username)[0];
        conversations[from] = dm.conversation;
        //conversations.push({user: from, conversation: dm.conversation});
    });
    return {'statusCode': 200, 'body': JSON.stringify({
        conversations: conversations
    })};
};

exports.POST = async (_, event) => {
    const username = await get_user_from_header(event.headers);
    const {to, message} = JSON.parse(event.body);
    const user = await User.findOne({username: to});
    console.log(user);
    if (!user.allowDmFromNotFollowed && !user.following.includes(username))
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                "message": `${to} only allows followers to DM`
            })
        };

    if (user.blocked.includes(username))
        return {
            'statusCode': 401,
            'body': JSON.stringify({
                "message": `${to} has blocked you`
            })
        };

    const id = [username, to].sort().join();
    var conv = await Conversation.findOne({con_id: id});
    if (conv == null)
        conv = new Conversation({con_id: id});
    conv.conversation.push({from: username, message: message});
    await conv.save();
    return {'statusCode': 200};
};
