const express = require('express');
const router = express.Router();
const controller = require('../controllers/member');
const validations = require('../middlewares/member')
const { multerStorage, extensionValidator } = require('../middlewares/files');

/* GET all members. */
router.get('/', controller.list);
router.post('/', multerStorage, extensionValidator, validations, controller.create);

router.delete('/:id', controller.delete);
router.put('/:id', multerStorage, extensionValidator, validations, controller.update);

module.exports = router;