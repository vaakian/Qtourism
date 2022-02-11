## APIs

[x]POST /user/auth (body: { name: string, password: string })

### no auth
GET /package?keyword=<keyword>&page=<page>
GET /package
GET /package/:id
GET /comment?package_id=<package_id>
GET /merchant/:id
POST /user/register (body: { name, password, tel, avatar_url })

### auth needed
POST /package (body: {name, price, description})
POST /comment (body: { package_id, content })
POST /order (body: { package_id })

DELETE /comment/:id
DELETE /package/:id
GET /user/:id
GET /user/:id/packages
GET /user/:id/comments
GET /user/:id/orders

GET /merchant/:id/
GET /merchant/:id/packages
GET /merchant/:id/orders

```