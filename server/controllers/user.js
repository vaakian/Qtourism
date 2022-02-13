const { userAuth } = require('../auth')
const models = require('../database/models')
const { makeResponse } = require('./utils')

// POST /user/register
const register = ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  return makeResponse(
    user.save(),
    ctx,
    '注册失败'
  )
}

// POST /user/login
const login = ctx => {
  const { username, password } = ctx.request.body
  const user = new models.User({ username, password })
  return user.fetch()
    .then(result => {
      const userinfo = result.toJSON()
      ctx.status = 200
      ctx.body = {
        token: userAuth.sign(userinfo),
        userinfo
      }
    }).catch(err => {
      console.log({ err })
      ctx.status = 403
      ctx.body = {
        message: '登录失败'
      }

    })
}


// // - [ ] GET /user/packages
// const getUserPackages = ctx => {
//   const { id } = userAuth.decode(ctx.header.authorization)
//   return makeResponse(
//     models.Package.where({ user_id: id }).fetchAll({
//       withRelated: ['merchant']
//     }),
//     ctx,
//     '未能获取到套餐'
//   )
// }
// - [ ] GET /user/comments

const getUserComments = ctx => {
  const { id } = userAuth.decode(ctx.header.authorization)
  return makeResponse(
    models.Comment.where({ user_id: id }).fetchAll({
      withRelated: ['package']
    }),
    ctx,
    '未能获取到评论'
  )
}

// - [ ] GET /user/orders
const getUserOrders = ctx => {
  const { id } = userAuth.decode(ctx.header.authorization)
  return makeResponse(
    models.Order.where({ user_id: id }).fetchAll({
      withRelated: ['package', 'merchant']
    }),
    ctx,
    '未能获取到订单'
  )
}
// - [ ] GET /user/info
const getUserInfo = ctx => {
  const { id } = userAuth.decode(ctx.header.authorization)
  return makeResponse(
    models.User.where({ id }).fetch(),
    ctx,
    '未能获取到用户信息'
  )
}

module.exports = {
  register,
  login,
  getUserComments,
  getUserOrders,
  getUserInfo
}