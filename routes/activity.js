const { Router } = require('express');

const { createNewActivityController } = require('../controllers/activity');

const { multerStorage, extensionValidator } = require('../middlewares/files');
const validateBody = require('../middlewares/activity');

const router = Router();

router.post(
    '/',
    multerStorage,
    extensionValidator,
    validateBody,
    createNewActivityController
);

module.exports = router;
