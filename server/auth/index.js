const jwt = require('koa-jwt')
const jsonwebtoken = require('jsonwebtoken')
const USER_JWT_SECRET = 'user secret'
const MERCHANT_JWT_SECRET = 'merchant secret'
createAuth = (secret) => ({
  verify(token) {
    return jsonwebtoken.verify(token, secret)
  },
  sign(userinfo) {
    return jsonwebtoken.sign(userinfo, secret)
  },
  decode(token) {
    return jsonwebtoken.verify(token.slice(7), secret)
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