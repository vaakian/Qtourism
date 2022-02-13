const models = require('../database/models')
const { userAuth, merchantAuth } = require("../auth")
const { makeResponse } = require('./utils')
const PAGE_SIZE = 10


// GET /package?page=1&keyword=xxx
const getPackages = ctx => {
  let { page, keyword } = ctx.query
  if (!!page === false || page <= 0) page = 1
  if (!!keyword === false) keyword = ''
  return makeResponse(
    models.Package.where('name', 'like', `%${keyword}%`).fetchPage({
      pageSize: PAGE_SIZE,
      page,
      withRelated: ['merchant']
    }),
    ctx,
    '未能获取到套餐'
  )
}

//GET /package/:id
const getPackageDetail = ctx => {
  const { id } = ctx.params
  return makeResponse(
    models.Package.where({ id }).fetch({
      withRelated: ['merchant']
    }),
    ctx,
    '未找到Package信息'
  )
}

// GET /package/:id/comment
const getComments = ctx => {
  const { id } = ctx.params
  return makeResponse(
    models.Comment.where({ package_id: id }).fetchAll({
      withRelated: ['user']
    }),
    ctx,
    '未找到评论'
  )
}
// POST /package/:id/comment
const addComment = ctx => {
  const { id } = ctx.params
  const { content } = ctx.request.body
  console.log('content', content)
  return makeResponse(
    new models.Comment({
      package_id: id,
      user_id: userAuth.decode(ctx.header.authorization).id,
      content
    }).save(),
    ctx,
    '未能添加评论'
  )
}

// DELETE /comment/:id
const deleteComment = async ctx => {
  const { id } = ctx.params
  // 需要先检测是否是属于本人的comment
  const user_id = userAuth.decode(ctx.header.authorization).id
  // 获取评论信息
  const comment = await models.Comment.where({ id })
    .fetch({ withRelated: ['user'] })
  if (comment.toJSON().user_id !== user_id) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
    return
  }

  return makeResponse(
    comment.destroy(),
    ctx,
    '删除评论失败'
  )
}


// merchant only
// delete package
const deletePackage = async ctx => {
  const { id } = ctx.params
  const merchant_id = merchantAuth.decode(ctx.header.authorization).id
  const package = await models.Package.where({ id }).fetch({
    withRelated: ['merchant']
  })
  if (package.toJSON().merchant_id !== merchant_id) {
    ctx.status = 401
    ctx.body = {
      message: 'Unauthorized'
    }
    return
  }
  return makeResponse(package.destroy(), ctx, '删除套餐失败')
}
const addPackage = ctx => {
  const { name, description, price, banner_url } = ctx.request.body
  const merchant_id = merchantAuth.decode(ctx.header.authorization).id
  const package = new models.Package({
    name,
    description,
    price,
    banner_url,
    merchant_id
  })
  return makeResponse(package.save(), ctx, '添加套餐失败')
}
module.exports = {
  getPackages,
  getPackageDetail,
  getComments,
  addComment,
  deleteComment,

  deletePackage,
  addPackage
}