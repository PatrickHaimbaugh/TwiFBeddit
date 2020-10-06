# Backend API

# /user

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
    "profile_pictrue": "String (url)",
    "bio": "String",
    "following": "[String (usernames)]",
    "followers": "Int",
    "savedPosts": "[String (id)]",
    "_id":"5f7ce5a4e353ea00088cc337",
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
