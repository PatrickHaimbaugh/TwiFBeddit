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

var PostSchema = new mongoose.Schema({
    creator: {
        type: String,
        unique: true,
        required: [true, "cannot be empty."],
    },
    text: { type: String, required: [true, "cannot be empty."] },
    isImagePost: { type: Boolean, default: false},
    isAnonymous: { type: Boolean, },
    image: {
        type: String,
        default:
        "https://twifbeddit-assests-prod.s3.us-east-2.amazonaws.com/default_profile.jpg",
    },
});

exports.Post = mongoose.model("Post", PostSchema);


mongoose.connect(
    "mongodb+srv://twifbeddit_user:twifbeddit_user@twifbeddit-cluster.reygv.mongodb.net/test?retryWrites=true&w=majority",
    { useUnifiedTopology: true }
);
