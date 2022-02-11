const Router = require('koa-router')
const { packageControllers, userControllers } = require('../controllers')
const router = new Router({ prefix: '/api' })


router.post('/user/login', userControllers.login)

router.get('/package', packageControllers.getPackages)
router.get('/package/:id', packageControllers.getPackageDetail)
module.exports = router