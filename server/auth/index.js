const jwt = require('koa-jwt')
const USER_JWT_SECRET = 'user secret'
const MERCHANT_JWT_SECRET = 'merchant secret'
createAuth = (secret) => ({
  verify(token) {
    return jwt.verify(token, USER_JWT_SECRET)
  },
  sign(userinfo) {
    return jwt.sign(userinfo, USER_JWT_SECRET)
  },
  decode(token) {
    return jwt.decode(token, USER_JWT_SECRET)
  }
})

const userAuthMiddleware = jwt({ secret: USER_JWT_SECRET })
const merchantAuthMiddleware = jwt({ secret: MERCHANT_JWT_SECRET })
module.exports = {
  userAuthMiddleware,
  merchantAuthMiddleware,
  userAuth: createAuth(USER_JWT_SECRET),
  merchantAuth: createAuth(MERCHANT_JWT_SECRET)
}