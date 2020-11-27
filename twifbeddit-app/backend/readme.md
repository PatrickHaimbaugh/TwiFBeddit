# Backend API

# /users

## GET
This will return information on a user. Currently this will succeed for all users, however in the future a user will need to be authenticated to see if they are blocked from getting a users info.
### Parameters
`username=username`
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (topics)]",
    "followers": "Int",
    "profile_pictrue": "String",
    "username": "String"
}
```

## POST
### Accepts
```json
{
    "username": "String",
    "email": "String",
    "password": "String"
}
```
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (usernames)]",
    "followers": "Int",
    "savedPosts": "[String (id)]",
    "username": "String",
    "email": "String"
}
```

## PATCH
### Accepts
### Parameters
`email=string&password=string&profile_picture=string&bio=string`
### Response
```json
{
    "profile_picture": "String (url)",
    "bio": "String",
    "following": "[String (usernames)]",
    "followers": "Int",
    "savedPosts": "[String (id)]",
    "_id":"5f7ce5a4e353ea00088cc337",
    "username": "String",
    "email": "String"
}
```
### Parameters
`usernameToFollow=string`
### Response
```json
{
    "following": "[String (usernames)]",
}
```
### Parameters
`usernameToUnfollow=string`
### Response
```json
{
    "following": "[String (usernames)]",
}
```
### Parameters
`allowDmFromNotFollowed=bool`
### Response
```json
{
    "allowDmFromNotFollowed": "Bool"
}
```
### Parameters
`usernameToBlock=string`
### Response
```json
{
    "blocked": "[String (username)]"
}
```
### Parameters
`usernameToUnBlock=string`
### Response
```json
{
    "blocked": "[String (username)]"
}
```

## DELETE
Delete deletes ther user associated with the current user session cookie, all their comments and decreases the following count for all of their followers.

### Response
This should always succeed with statusCode 200.

# /verify

## GET
Set's the user's "verified" boolean to true. It is made as a get request to enable users to click on a link to this endpoint in order to verify their account.
### Parameters
`uuid=string`
### Response

```json
{
    "email": "String, email being verified",
    "username": "String, user being verified",
    "verified": "Boolean, user's verification status"
}
```

# /login

## GET
### Parameters
`[username|email]=string&password=string`
### Response
Set-Cookie Header, and user object like above

# /posts
# Extern Post Type
```json
{
    "title": "String, only present on posts not comments",
    "author": "String, may be null if the post is anonymous",
    "upvotes": "Int",
    "downvotes": "Int",
    "topic": "String, only present on posts not comments",
    "post_type": "One of comment, text or image",
    "text": "String",
    "image_url": "String, only on image posts",
    "comments": "[Post] array of Posts with post_types: comment"
}
```

## POST
### Accepts
```json
{   
    "title": "String",
    "anonymous": "Bool (optional, defaults false)",
    "topic": "String (optional, defaults to null, meaning 'all')",
    "post_type": "String (optional, one of ['text'], only type supported, defaults to text)",
    "text": "String",
}
```
### Response
```json
{
    "postId": "String (id)"
}
```

## GET
### Response
```json
{
    "posts": "[Post] (posts sorted by most recent, under topics followed by the user and from a user that the user follows, and does not return anonymously made posts)" 
}
```

## GET
### Parameters
`topic=string`
### Accepts
```json
{
    "topic": "String (valid topic)"
}
```
### Response
```json
{
    "posts": "[Post] (posts under the topic)"
}
```
### Parameters
`author=string`
### Accepts
```json
{
    "author": "String (valid user/author)"
}
```
### Response
```json
{
    "posts": "[Post] (posts under the specified user that aren't anonymous)"
}
```

# /topics
## POST
### Parameters
`topicToFollow=string`
### Response
```json
{
    "followed_topics": "[String (any topic can be followed, it does not necessarily have to exist in a post)]",
}
```
### Parameters
`topicToUnfollow=string`
### Response
```json
{
    "followed_topics": "[String (any topic can be unfollowed)]",
}
```

## GET
### Response
```json
{
    "topics": "[Topic (topic_name)]"
}
```

# /votes
## POST
### Parameters
`postId=string&action=[up|down|unup|undown]`
### Response
```json
{
    "userUpVoted": "boolean",
    "userDownVoted": "boolean",
    "numUp": "int",
    "numDown": "int"
}
```
### Errors
A common response is 409 Conflict, when for example, upvoting a post that was already upvoted. Regardless, the same json object will be returned, just without an update.

# /save
## POST
### Parameters
`postId=string[&unsave=true]`

If unsave is set to true, then a post then a previously saved post will be removed from the users saved posts set.
No error checking is done on postId to see if it is valid. This will only ever fail if the Cookie is invalid.
### Response
None

## GET
### Response
```json
{
    "posts": "[String (post ID)]"
}
```

# /comment
Comments are the same internally as posts, comment ids can be used in many of the same places that postId's can be used. For example save and vote will work with both ids.
## POST
### Parameters
`id=string`
### Accepts
```json
{
    "text": "String",
    "anonymous": "Boolean (optional, defaults false)",
}
```

# /block
Blocking a user will make their posts not show up on a users feed unless they specifically look at that users posts. It will also not allow the blocked user to DM them.
## POST
### Parameters
`toBlock=string (username)`

# /dm
## POST
### Accepts
```json
{
    "to": "String (username)",
    "message": "String"
}
```
### Response
None
## GET
### Response
Object mapping username to the conversation between that user.
An example. If the user alex has messaged james "hello" and james responds "hi" the GET from alex's account will look like:
```json
{
    "james": [
        {
            "from": "alex",
            "message": "hello"
        },
        {
            "from": "james",
            "message": "hi"
        }
    ]
}
```
From James' account it will look exactly the same except it is from alex
```json
{
    "alex": [
        {
            "from": "alex",
            "message": "hello"
        },
        {
            "from": "james",
            "message": "hi"
        }
    ]
}
```