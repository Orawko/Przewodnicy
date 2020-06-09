const Express = require('express')
const multer = require('multer')
const bodyParser = require('body-parser')

const router = Express.Router();

router.use(bodyParser.json())

const Storage = multer.diskStorage({
    destination(req, file, callback) {
        callback(null, './sources/userImages')
    },
    filename(req, file, callback) {
        callback(null, `${file.originalname}`)
    },
})

const upload = multer({storage: Storage})

router.post('/api/upload', upload.array('photo', 3), (req, res) => {
    console.log('file', req.files)
    console.log('body', req.body)
    res.status(200).json({
        message: 'success!',
    })
})


module.exports = router;
