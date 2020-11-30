var aws = require("aws-sdk");
var ses = new aws.SES({ region: "us-east-2" });

exports.send_email = async (to, subject, body) => {
    var params = {
        Destination: {
          ToAddresses: [to],
        },
        Message: {
          Body: {
            Text: { Data: body },
          },
    
          Subject: { Data: subject },
        },
        Source: "twifbeddit.user@gmail.com",
    };

    return ses.sendEmail(params).promise()
};

exports.GET = async (_, event) => {
    await exports.send_email("abrachet@purdue.edu", "Test Email", "This is a test");
    return {'statusCode': 200};
};
