
exports.lambdaHandler = async (event, _) => {

    if (event.path == "/randnum" && event.httpMethod == "GET")
        return {
            'statusCode': 200,
            'body': JSON.stringify({
                num: Math.random()
            })
        }
   
    return {
        'statusCode': 200,
        'body': JSON.stringify(event)
    }
};
