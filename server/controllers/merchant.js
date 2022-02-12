const models = require('../database/models')

const { merchantAuth } = require('../auth')
const login = async ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  const result = await user.fetch()
  if (result) {
    const userinfo = result.toJSON()
    ctx.status = 200
    ctx.body = {
      token: merchantAuth.sign(userinfo),
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
  login
}