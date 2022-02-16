const Router = require('express')
const bannerController = require('../controllers/bannerController')
const router = new Router()
const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage(
    {
        destination: './assets/images/',
        filename: function (req, file, cb) {
            cb(null, `${new Date().toISOString().replace(/:/g, '-')}_${file.originalname}`);
        }
    }
);

const upload = multer({ storage: storage });

router.get('/getAll', bannerController.getAll)
router.post('/create', upload.single('file'), bannerController.create)
router.delete('/remove', bannerController.remove)
router.get('/getOne', bannerController.getOne)
module.exports = router