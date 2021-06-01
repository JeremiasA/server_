const { Router } = require('express');

const {
    awsGetFileController,
    awsUploadFileController,
} = require('../controllers/aws');

const { extensionValidator, multerStorage } = require('../middlewares/files');

const router = Router();

router.post(
    '/upload',
    multerStorage,
    extensionValidator,
    awsUploadFileController
);
router.get('/getfile/:filename', awsGetFileController);

module.exports = router;
