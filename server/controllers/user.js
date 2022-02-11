const models = require('../database/models')

// POST /user/register
const register = async ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  const result = await user.save()
  if (result) {
    ctx.status = 200
    ctx.body = result.toJSON()
  } else {
    ctx.status = 500
    ctx.body = {
      message: '注册失败'
    }
  }
}

// POST /user/login
const login = async ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  const result = await user.fetch()
  if (result) {
    const userinfo = result.toJSON()
    ctx.status = 200
    ctx.body = {
      token: auth.sign(userinfo),
      userinfo
    }
  } else {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
  }
}


module.exports = {
  register,
  login
}