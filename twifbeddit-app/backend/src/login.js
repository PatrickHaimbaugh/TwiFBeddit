const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { create_external_user } = require("./users");
const { get_cookie_header } = require("./auth");

exports.GET = async (_, event) => {
    const {username, password} = event.queryStringParameters;
    const user = await User.findOne({username: username});
    if (!bcrypt.compareSync(password, user.password))
        return {'statusCode': 401};

    return {
        'statusCode': 200,
        'headers': await get_cookie_header(username),
        'body': JSON.stringify(create_external_user(user))
    };
};
