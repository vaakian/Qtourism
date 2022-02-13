const makeResponse = (promise, ctx, errMsg) => {
  return promise.then(result => {
    ctx.status = 200
    ctx.body = result.toJSON()
  }).catch(err => {
    ctx.status = 403
    ctx.body = {
      message: errMsg
    }
  })
}

module.exports = {
  makeResponse
}