const mongoose = require("mongoose");
const UserSession = mongoose.model("UserSession");
const { v4: uuidv4 } = require('uuid');

exports.get_cookie_header = async (username) => {
    const session = new UserSession({
        session_id: uuidv4(),
        username: username
    });
    session.save();
    return {"Set-Cookie": "session-id=" + session.session_id};
};

exports.get_user_from_header = async (headers) => {
    var cookies = headers.cookie;
    if (cookies == undefined) {
        cookies = headers.Cookie;
        if (cookies == undefined) {
            console.log("No cookies in header");
            return null;
        }
    }
    cookies = cookies.split(';')
    if (cookies.length != 1) {
        console.error("Too many key values in cookie");
        return null;
    }
    const [key, session_id] = cookies[0].split('=');
    return (await UserSession.findOne({session_id: session_id})).username;
};
