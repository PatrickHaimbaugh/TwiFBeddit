require("./mongo");

exports.lambdaHandler = async (event, _) => {
    console.log(event);

    if (event.path == "/randnum" && event.httpMethod == "GET")
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                num: Math.random()
            })
        }

    path = event.path.split('/');
    if (path.shift() != '')
        return {'statusCode': 500};
    try {
        request = require("./" + path[0]);
        path.shift()
        requestMethod = request[event.httpMethod];
    } catch (err) {
        console.error(err);
        return {
            'statusCode': 404,
            'body': JSON.stringify(err)
        }
    }
    
    const res = await requestMethod(path, event);
    if (res.headers == undefined)
        res.headers = {};
    res.headers["Access-Control-Allow-Origin"] = "*";
    res.headers["Access-Control-Allow-Methods"] = "*";
    res.headers["Access-Control-Allow-Headers"] = "*";
    console.log(res);
    return res;
};
