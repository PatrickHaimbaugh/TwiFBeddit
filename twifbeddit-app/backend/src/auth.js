const UserSession = require("./mongo").UserSession;
const { v4: uuidv4 } = require('uuid');

exports.get_cookie_header = async (username) => {
    const session = new UserSession({
        session_id: uuidv4(),
        username: username
    });
    session.save();
    return {"Set-Cookie": "session-id=" + session.session_id};
};
