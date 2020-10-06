let mongoose = require("mongoose");

var UserSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "cannot be empty."],
    },
    email: { type: String, unique: true, required: [true, "cannot be empty."] },
    password: { type: String, required: [true, "cannot be empty."] },
    profile_pictrue: {
        type: String,
        default:
        "https://twifbeddit-assests-prod.s3.us-east-2.amazonaws.com/default_profile.jpg",
    },
    bio: { type: String, default: "" },
    following: { type: [String], default: [] },
    followers: { type: Number, default: 0 },
    savedPosts: { type: [String], default: [] },
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
    author: {type: String},
    anonymous: {type: Boolean, default: false},
    topic: {type: String, default: null},
    post_type: {type: String, default: "text"},
    text: {type: String, required: [true, "cannot be empty."]}
}, {timestamps: true});

exports.Post = mongoose.model("Post", PostSchema);

mongoose.connect(
    "mongodb+srv://twifbeddit_user:twifbeddit_user@twifbeddit-cluster.reygv.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true, useNewUrlParser: true}
);
