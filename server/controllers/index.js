const models = require('../database/models')
const PAGE_SIZE = 10
// page & keyword
const getPackagesByQuery = async (ctx) => {
  let { page, keyword } = ctx.query
  if (page <= 0) {
    page = 1
  }
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


module.exports = {
  getPackagesByQuery
}