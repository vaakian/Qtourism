const jwt = require('koa-jwt')
const { User } = require('../database/models')

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
    ctx.state.user = jwt.verify(token, 'process.env.JWT_SECRET')
  } catch (err) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
    return
  }

  return next()
}

// koa 登录接口，返回jwt token
async function login(ctx) {
  const { username, password } = ctx.request.body
  const user = new User({ username, password })
  const result = await user.fetch()
  if (result) {
    const userinfo = result.toJSON()
    ctx.status = 200
    ctx.body = {
      token: jwt.sign(userinfo, 'process.env.JWT_SECRET'),
      userinfo
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
  }
}



// const authMiddleware = jwt({ secret: 'shared-secret' })

module.exports = {
  authMiddleware,
  login
}