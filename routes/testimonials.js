var express = require('express');
var router = express.Router();
const controller = require('../controllers/testimonial');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validate = require('../middlewares/testimonial');
const { multerStorage } = require('../middlewares/files');

router.delete('/:id', verifyAdmin, controller.delete);

router.post('/', multerStorage, validate, controller.create);

router.put('/:id', verifyAdmin, multerStorage, validate, controller.modifyTestimony);

module.exports = router;
