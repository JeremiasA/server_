var express = require('express');
var router = express.Router();
const controller = require('../controllers/entry');
const entryValidate = require('../middlewares/entry');
const { multerStorage } = require('../middlewares/files');

/* GET single entry. */
router.get('/:id', controller.detail);

router.post('/', multerStorage, entryValidate, controller.create);

module.exports = router;
