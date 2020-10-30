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
    const cookienames = ["Cookie", "cookie", "x-twifbeddit-cookie"]
    var cookies = undefined;
    for (var i = 0; i < cookienames.length; i++) {
        cookies = headers[cookienames[i]];
        if (cookies != undefined)
            break;
    }
    if (cookies == undefined) {
        console.error("No cookies in header");
        console.log(headers);
        return null;
    }
    cookies = cookies.split(';')
    if (cookies.length != 1) {
        console.error("Too many key values in cookie");
        return null;
    }
    const [key, session_id] = cookies[0].split('=');
    return (await UserSession.findOne({session_id: session_id})).username;
};
