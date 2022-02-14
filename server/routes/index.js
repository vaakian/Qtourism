const Router = require('koa-router')
const { userAuthMiddleware, merchantAuthMiddleware } = require('../auth')
const { packageControllers, userControllers, orderControllers, merchantControllers } = require('../controllers')
const router = new Router({ prefix: '/api' })

router.post('/user/login', userControllers.login)
router.post('/user/register', userControllers.register)
router.post('/merchant/login', merchantControllers.login)

router.get('/package', packageControllers.getPackages)
router.get('/package/:id', packageControllers.getPackageDetail)
router.get('/package/:id/comment', packageControllers.getComments)

// authentication needed

// comment
router.post('/package/:id/comment', userAuthMiddleware, packageControllers.addComment)
router.delete('/comment/:id', userAuthMiddleware, packageControllers.deleteComment)

// order
router.post('/order', userAuthMiddleware, orderControllers.addOrder)

// user
router.get('/user/info', userAuthMiddleware, userControllers.getUserInfo)
// router.get('/user/package', userAuthMiddleware, userControllers.getUserPackages)
router.get('/user/comment', userAuthMiddleware, userControllers.getUserComments)
router.get('/user/order', userAuthMiddleware, userControllers.getUserOrders)

// package (merchant only)
router.post('/package', merchantAuthMiddleware, packageControllers.addPackage)
router.delete('/package/:id', merchantAuthMiddleware, packageControllers.deletePackage)
router.get('/merchant/package', merchantAuthMiddleware, merchantControllers.getMerchantPackages)
router.get('/merchant/order', merchantAuthMiddleware, merchantControllers.getMerchantOrders)
module.exports = router