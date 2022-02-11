const models = require('../database/models')
const { userAuth } = require("../auth")
const PAGE_SIZE = 10


// GET /package?page=1&keyword=xxx
const getPackages = async (ctx) => {
  let { page, keyword } = ctx.query
  if (!!page === false || page <= 0) page = 1
  if (!!keyword === false) keyword = ''
  const packages = await models.Package.where('name', 'like', `%${keyword}%`).fetchPage({
    pageSize: PAGE_SIZE,
    page,
    withRelated: ['merchant']
  })
  ctx.body = {
    packages: packages.toJSON(),
    page: packages.pagination.page,
    pages: packages.pagination.pageCount
  }
}

//GET /package/:id
const getPackageDetail = async ctx => {
  const { id } = ctx.params
  try {
    const package = await models.Package.where({ id }).fetch({
      withRelated: ['merchant']
    })
    ctx.body = package.toJSON()
  } catch (err) {
    ctx.status = 404
    ctx.body = {}
  }
}

// GET /package/:id/comment
const getComments = async ctx => {
  const { id } = ctx.params
  try {
    const package = await models.Comment.where({ package_id: id }).fetchAll()
    ctx.body = package.toJSON()
  } catch (err) {
    ctx.status = 404
    ctx.body = {}
  }
}
// POST /package/:id/comment
const addComment = async ctx => {
  const { id } = ctx.params
  const { content } = ctx.request.body
  try {
    const package = await new models.Comment({
      package_id: id,
      user_id: userAuth.decode(ctx.header.authorization).id,
      content
    }).save()
    ctx.body = package.toJSON()
  } catch (err) {
    ctx.status = 404
    ctx.body = {}
  }
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

  try {
    const comment = await models.Comment.where({ id }).destroy()
    ctx.body = comment.toJSON()
  } catch (err) {
    ctx.status = 403
    ctx.body = {}
  }
}


// merchant only
// delete package
const deletePackage = async ctx => {
  const { id } = ctx.params
  const merchant_id = userAuth.decode(ctx.header.authorization).id
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
  try {
    const package = await models.Package.where({ id }).destroy()
    ctx.body = package.toJSON()
  } catch (err) {
    ctx.status = 403
    ctx.body = {}
  }
}
module.exports = {
  getPackages,
  getPackageDetail,
  getComments,
  addComment,
  deleteComment,

  deletePackage,
}