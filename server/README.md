## APIs

[x]POST /user/auth (body: { name: string, password: string })

### no auth
[x]GET /package?keyword=<keyword>&page=<page>\
~~GET /package~~\
[x]GET /package/:id\
[x]GET /package/:id/comment\
~~GET /merchant/:id~~\
[x]POST /user/register (body: { name, password, tel, avatar_url })

### auth needed
POST /package (body: {name, price, description})\
[x]POST /package/:id/comment (body: { content })\
POST /order (body: { package_id })\

DELETE /comment/:id\
DELETE /package/:id\
GET /user/:id\
GET /user/:id/packages\
GET /user/:id/comments\
GET /user/:id/orders

GET /merchant/:id/\
GET /merchant/:id/packages\
GET /merchant/:id/orders

## bookshelf


### visible 
黑名单/白名单方式让某些属性不被包含，比如password。
https://bookshelfjs.org/api.html#Model-instance-hidden
https://bookshelfjs.org/api.html#Model-instance-visible