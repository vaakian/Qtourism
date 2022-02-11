const Router = require('koa-router')
const { userAuthMiddleware } = require('../auth')
const { packageControllers, userControllers } = require('../controllers')
const router = new Router({ prefix: '/api' })

router.post('/user/login', userControllers.login)

router.get('/package', packageControllers.getPackages)

router.get('/package/:id', packageControllers.getPackageDetail)
router.get('/package/:id/comment', packageControllers.getComments)

// authentication needed
router.post('/package/:id/comment', userAuthMiddleware, packageControllers.addComment)
router.delete('/comment/:id', userAuthMiddleware, packageControllers.deleteComment)
module.exports = router