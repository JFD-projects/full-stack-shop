const Router = require('express')
const router = new Router()
const productRoute = require('./product')
const userRoute = require('./user')

router.use('/product', productRoute)
router.use('/user', userRoute)

module.exports = router