const Router = require('koa-router')
const { userAuthMiddleware, merchantAuthMiddleware } = require('../auth')
const { packageControllers, userControllers, orderControllers } = require('../controllers')
const router = new Router({ prefix: '/api' })

router.post('/user/login', userControllers.login)
router.post('/user/register', userControllers.register)
router.get('/package', packageControllers.getPackages)

router.get('/package/:id', packageControllers.getPackageDetail)
router.get('/package/:id/comment', packageControllers.getComments)

// authentication needed

// comment
router.post('/package/:id/comment', userAuthMiddleware, packageControllers.addComment)
router.delete('/comment/:id', userAuthMiddleware, packageControllers.deleteComment)

// order
router.post('/order', userAuthMiddleware, orderControllers.addOrder)

// package (merchant only)
router.delete('/package/:id', merchantAuthMiddleware, packageControllers.deletePackage)
router.post('/package', merchantAuthMiddleware, packageControllers.addPackage)
module.exports = router