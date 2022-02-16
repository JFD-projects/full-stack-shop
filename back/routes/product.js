const Router = require('express')
const productController = require('../controllers/productController')
const router = new Router()
const multer = require('multer')


const storage = multer.diskStorage(
    {
        destination: './assets/productImages/',
        filename: function (req, file, cb) {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`);
        }
    }
);

const upload = multer({ storage: storage });

router.get('/getAll', productController.getAll)
router.post('/create', upload.single('file'), productController.create)
router.delete('/remove', productController.remove)
router.get('/getOne', productController.getOne)
router.post('/getMany', productController.getMany)
router.put('/edit', upload.single('file'), productController.edit)
module.exports = router