const User = require("./mongo").User;
const bcrypt = require("bcryptjs");
const { get_cookie_header } = require("./auth");

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    var hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    const newUser = new User(data);
    try {
        var createdUser = await newUser.save();
    } catch (err) {
        console.error(err);
        return {'statusCode': 400};
    }
    createdUser.password = undefined;
    createdUser._id = undefined;
    createdUser.__v = undefined;
    return {
        'statusCode': 200,
        'headers': await get_cookie_header(createdUser.username),
        'body': JSON.stringify({
            createdUser
        })
    };
};
