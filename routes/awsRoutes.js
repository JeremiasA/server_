const { Router } = require('express');

const { awsGetFileController, awsUploadFileController} = require('../controllers/awsController')

const {
    extensionValidator,
    multerStorage,
} = require('../middlewares/filesVerification');

const router = Router();

router.post('/upload', multerStorage, extensionValidator, awsUploadFileController);
router.get('/getfile/:filename', awsGetFileController);

module.exports = router;