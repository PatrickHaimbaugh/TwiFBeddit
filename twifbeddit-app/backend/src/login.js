const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { create_external_user } = require("./users");
const { get_cookie_header } = require("./auth");

exports.GET = async (_, event) => {
    const {username, email, password} = event.queryStringParameters;
    var find = username == undefined ? {email: email} : {username: username};
    const user = await User.findOne(find);
    if (!bcrypt.compareSync(password, user.password))
        return {'statusCode': 401};

    return {
        'statusCode': 200,
        'headers': await get_cookie_header(user.username),
        'body': JSON.stringify(create_external_user(user))
    };
};
