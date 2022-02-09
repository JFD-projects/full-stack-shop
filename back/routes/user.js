const Router = require('express')
const router = new Router()
const userController = require('../controllers/userController')
// const authMiddleware = require('../middleware/authMiddleware')

router.get('/getAll', userController.getAll)
router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.put('/edit', userController.edit)
// router.get('/auth', authMiddleware, userController.check)

module.exports = router
