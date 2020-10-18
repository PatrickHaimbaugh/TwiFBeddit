# Backend API

# /user

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

# /login

## GET
### Parameters
`username=string&password=string`
### Response
Set-Cookie Header, and user object like above

# /posts
## POST
### Accepts
```json
{
    "anonymous": "Bool (optional, defaults false)",
    "topic": "String (optional, defaults to null, meaning 'all')",
    "post_type": "String (optional, one of ['text'], only type supported, defaults to text)",
    "text": "String"
}
```
### Response
```json
{
    "postId": "String (id)"
}
```

## GET
### Parameters
Currently none, all that is important is the cookie obtained from login/sign up
### Response
```json
{
    "posts": "[Post (defined above)]"
}
```
