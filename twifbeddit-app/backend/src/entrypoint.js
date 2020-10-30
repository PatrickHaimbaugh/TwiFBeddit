require("./mongo");

exports.lambdaHandler = async (event, _) => {
    console.log(event);

    if (event.httpMethod == "OPTIONS") {
        return {
            'statusCode': 204,
            'headers': {'Allow': "GET, POST, PATCH, DELETE, OPTIONS", 
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "*",
                        "Access-Control-Allow-Headers": "*",
                        "Access-Control-Allow-Credentials": "true",
                        "Access-Control-Expose-Headers": "*",
                        "Access-Control-Request-Headers": "x-twifbeddit-cookie"
                    }
        };
    }

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

    const try_or_error = async (func) => {
        try {
            return await func();
        } catch (err) {
            console.error(err)
            return {
                'statusCode': 500,
                'body': JSON.stringify({'exception': err.message})
            };
        }
    }

    const res = await try_or_error(async () => {
        return await requestMethod(path, event);
    });
    if (res.headers == undefined)
        res.headers = {};
    res.headers["Access-Control-Allow-Origin"] = "*";
    res.headers["Access-Control-Allow-Methods"] = "*";
    res.headers["Access-Control-Allow-Headers"] = "*";
    res.headers["Access-Control-Allow-Credentials"] = "true";
    res.headers["Access-Control-Expose-Headers"] = "*";
 
    console.log(res);
    return res;
};
