## APIs


### NO AUTH

- [x] GET /package?keyword=<keyword>&page=<page>
- [x] GET /package/:id
- [x] GET /package/:id/comment
- [x] POST /user/register (body: { username, password, tel, avatar_url })


#### both user and merchant

- [x] POST /user/login (body: { username: string, password: string })

### AUTH NEEDED


#### merchant only

- [ ] POST /package (body: {name, price, description})
- [ ] DELETE /package/:id
- [ ] GET /merchant/packages
- [ ] GET /merchant/orders?package_id=<package_id>&page=<page>


#### user only
- [x] DELETE /comment/:id
- [x] POST /package/:id/comment (body: { content })
- [ ] POST /order (body: { package_id })
- [ ] GET /user/info
- [ ] GET /user/packages
- [ ] GET /user/comments
- [ ] GET /user/orders



## bookshelf


### visible 

黑名单/白名单方式让某些属性不被包含，比如password。
https://bookshelfjs.org/api.html#Model-instance-hidden\
https://bookshelfjs.org/api.html#Model-instance-visible