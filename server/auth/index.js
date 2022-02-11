const jwt = require('koa-jwt')
const { User } = require('../database/models')
const auth = {
  verify(token) {
    return jwt.verify(token, 'process.env.JWT_SECRET')
  },
  sign(userinfo) {
    return jwt.sign(userinfo, 'process.env.JWT_SECRET')
  },
  decode(token) {
    return jwt.decode(token, 'process.env.JWT_SECRET')
  }
}

// 验证是否有token，有则验证valid
function authMiddleware(ctx, next) {
  if (ctx.url.startsWith('/api/auth')) {
    return next()
  }

  // const token = ctx.cookies.get('token')
  const token = ctx.headers.authorization

  if (!token) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
    return
  }

  try {
    ctx.state.user = auth.verify(token)
  } catch (err) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
    return
  }

  return next()
}




// const authMiddleware = jwt({ secret: 'shared-secret' })

module.exports = {
  authMiddleware,
  auth
}