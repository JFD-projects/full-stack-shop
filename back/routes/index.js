const Router = require('express')
const router = new Router()
const productRoute = require('./product')
const userRoute = require('./user')
const bannerRoute = require('./banner')

router.use('/product', productRoute)
router.use('/user', userRoute)
router.use('/banner', bannerRoute)

module.exports = router