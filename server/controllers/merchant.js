const models = require('../database/models')

const { merchantAuth } = require('../auth')
const { makeResponse } = require('./utils')
const login = ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  return user.fetch().then(result => {
    const userinfo = result.toJSON()
    ctx.status = 200
    ctx.body = {
      ...userinfo,
      token: merchantAuth.sign(userinfo)
    }
  }).catch(err => {
    ctx.status = 403
    ctx.body = {
      message: '登录失败'
    }
  })
}

// POST /merchant/package
const getMerchantPackages = ctx => {
  const { id } = merchantAuth.decode(ctx.header.authorization)
  return makeResponse(
    models.Package.where({ merchant_id: id }).fetchAll(),
    '没有找到套餐'
  )
}

// - [ ] GET /merchant/orders?package_id=1823&page=1
const getMerchantOrders = ctx => {
  const { id } = merchantAuth.decode(ctx.header.authorization)
  return makeResponse(
    models.Order.where({ merchant_id: id }).fetchAll({
      withRelated: ['package', 'user']
    }),
    ctx,
    '没有找到订单'
  )
}

module.exports = {
  login,
  getMerchantPackages,
  getMerchantOrders
}