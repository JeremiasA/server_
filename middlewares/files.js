const multer = require('multer');
const mimeType = require('mime-types');

const {createNewActivityController } = require('../controllers/activity')

const storage = multer.memoryStorage({
    filename: (req, file, cb) => {
        cb('', '');
    },
});

const multerStorage = multer({ storage }).single('image');

const extensionValidator = (req, res, next) => {
    const file = req.file;
    if (file === undefined) {
        next();
    } else {
        const extensionFile = mimeType.extension(req.file.mimetype);

        if (!extensionFile) {
            res.json({ error: 'Invalid file' });
        } else {
            if (
                extensionFile === 'jpg' ||
                extensionFile === 'jpeg' ||
                extensionFile === 'png'
            ) {
                next();
            } else {
                res.json({
                    error: 'Invalid image extension, valid image extension are JPG and PNG',
                });
            }
        }
    }
};

module.exports = { multerStorage, extensionValidator };
