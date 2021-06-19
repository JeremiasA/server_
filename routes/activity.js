const { Router } = require('express');

const {
    createNewActivityController,
    editActivity,
    detailController,
} = require('../controllers/activity');

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

router.put(
    '/:id',
    multerStorage,
    extensionValidator,
    validateBody,
    editActivity
);

router.get('/:id', detailController);

module.exports = router;
