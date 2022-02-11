const Koa = require('koa')
const router = require('./routes')
const app = new Koa()

app
  .use(router.routes())
  .use(router.allowedMethods())
// app.use(async ctx => {
//   ctx.body = {
//     message: 'Hello World'
//   }
// })

app.listen(3000)