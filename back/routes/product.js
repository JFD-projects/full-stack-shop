const Router = require('express')
const productController = require('../controllers/productController')
const router = new Router()

router.get('/getAll', productController.getAll)
router.post('/create', productController.create)
router.delete('/remove', productController.remove)
router.get('/getOne', productController.getOne)
router.post('/getMany', productController.getMany)
router.put('/edit', productController.edit)
module.exports = router