## APIs


### NO AUTH

- [x] GET /package?keyword=<keyword>&page=<page>
- [x] GET /package/:id
- [x] GET /package/:id/comment


#### both user and merchant

- [x] POST /user/register (body: { username, password, tel, avatar_url/description })
- [x] POST /user/login (body: { username: string, password: string })
- ~~[ ] POST /user/logout~~
### AUTH NEEDED


#### merchant only

- [x] POST /package (body: {name, price, description})
- [x] DELETE /package/:id
- [x] ~~GET /merchant/packages~~
- [x] GET /merchant/orders?package_id=1823&page=1


#### user only
- [x] DELETE /comment/:id
- [x] POST /package/:id/comment (body: { content })
- [x] POST /order (body: { package_id })

<!-- #### unnecessary -->
- [x] GET /user/info
- [x] GET /user/packages
- [x] GET /user/comments
- [x] GET /user/orders



## bookshelf


### visible 

黑名单/白名单方式让某些属性不被包含，比如password。
https://bookshelfjs.org/api.html#Model-instance-hidden\
https://bookshelfjs.org/api.html#Model-instance-visible