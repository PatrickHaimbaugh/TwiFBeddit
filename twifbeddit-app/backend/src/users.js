var User = require("./mongo").User;
var bcrypt = require("bcryptjs");

exports.POST = async (_, event) => {
    var data = JSON.parse(event.body);
    var hash = bcrypt.hashSync(data.password, 10);
    data.password = hash;
    const newUser = new User(data);
    try {
        var createdUser = await newUser.save();
    } catch (err) {
        return {'statusCode': 400};
    }
    createdUser.password = undefined;
    createdUser._id = undefined;
    createdUser.__v = undefined;
    return {
        'statusCode': 200,
        'body': JSON.stringify({
            createdUser
        })
    }
}
