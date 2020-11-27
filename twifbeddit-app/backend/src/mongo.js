const { mongo } = require("mongoose");
let mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "cannot be empty."],
    },
    email: { type: String, unique: true, required: [true, "cannot be empty."] },
    password: { type: String, required: [true, "cannot be empty."] },
    profile_picture: {
        type: String,
        default:
        "https://twifbeddit-assests-prod.s3.us-east-2.amazonaws.com/default_profile.jpg",
    },
    bio: { type: String, default: "" },
    followed_topics: { type: [String], default: [] },
    following: { type: [String], default: [] },
    followers: { type: Number, default: 0 },
    blocked: {type: [String], default: []},
    allowDmFromNotFollowed: {type: Boolean, default: true},
    savedPosts: { type: [String], default: [] },
    // Post _id to [up|down]
    postVotes: { type: Map, of: String, default: {}},
    verified: {type: Boolean, default: false},
});

exports.User = mongoose.model("User", UserSchema);

var UserSessionSchema = new mongoose.Schema({
    session_id: {type: String, index: true, required: [true, "cannot be empty."]},
    username: {type: String, required: [true, "cannot be empty."]}
}, {timestamps: true});

// TTL of one week
UserSessionSchema.index({createdAt: 1}, {expireAfterSeconds: 604800});

exports.UserSession = mongoose.model("UserSession", UserSessionSchema);

var PostSchema = new mongoose.Schema({
    title: {type: String},
    author: {type: String},
    anonymous: {type: Boolean, default: false},
    upvotes: {type: Number, default: 0},
    downvotes: {type: Number, default: 0},
    topic: {type: String, default: null},
    post_type: {type: String, default: "text"},
    text: {type: String, required: [true, "cannot be empty."]},
    image_url: {type: String, default: null},
    url: {type: String, default: null},
    comments: {type: [mongoose.ObjectId], default: []},
}, {timestamps: true});

exports.Post = mongoose.model("Post", PostSchema);

var TopicSchema = new mongoose.Schema({
    topic_name: {type: String}
});

exports.Topic = mongoose.model("Topic", TopicSchema);


var MessageSchema = new mongoose.Schema({
    from: {type: String},
    message: {type: String}
});

const Message = mongoose.model("Message", MessageSchema);
exports.Message = Message;

var ConversationSchema = new mongoose.Schema({
    // [user1, user2].sort().join()
    con_id: {type: String},
    conversation: { type: [MessageSchema], default: {}},
});

exports.Conversation = mongoose.model("Conversation", ConversationSchema);

var VerifySchema = new mongoose.Schema({
    email: {type: String},
    username: {type: String},
    verification_uuid: {type: String},
});

exports.Verify = mongoose.model("Verify", VerifySchema);

mongoose.set('useFindAndModify', false);

mongoose.connect(
    "mongodb+srv://twifbeddit_user:twifbeddit_user@twifbeddit-cluster.reygv.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true}
);
