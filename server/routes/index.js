const Router = require('koa-router')
const { login } = require('../auth')
const { getPackagesByQuery } = require('../controllers')
const router = new Router({ prefix: '/api' })


router.post('/user/auth', login)

router.get('/package', getPackagesByQuery)
module.exports = router