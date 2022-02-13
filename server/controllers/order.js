const { userAuth } = require('../auth')
const models = require('../database/models')
const { makeResponse } = require('./utils')
// /order
const addOrder = ctx => {
  const package_id = ctx.request.body.package_id
  const user_id = userAuth.decode(ctx.header.authorization).id
  const order = new models.Order({ package_id, user_id })
  return makeResponse(order.save(), ctx, '添加订单失败')
}

module.exports = {
  addOrder
}