const User = require("./mongo").User;
const bcrypt = require("bcryptjs");
const { get_cookie_header } = require("./auth");
<<<<<<< HEAD

exports.create_external_user = (mongo_user) => {
    var user = mongo_user;
    delete user.password;
    delete user._id;
    delete user.__v;
    return user;
}
=======
>>>>>>> 124559a8be638b468aaa4cf78aa97786bc4d63a1

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
    return {
        'statusCode': 200,
        'headers': await get_cookie_header(createdUser.username),
<<<<<<< HEAD
        'body': JSON.stringify(create_external_user(createdUser))
=======
        'body': JSON.stringify({
            createdUser
        })
>>>>>>> 124559a8be638b468aaa4cf78aa97786bc4d63a1
    };
};
