var express = require('express');
var router = express.Router();
const controller = require('../controllers/entry');
const entryValidate = require('../middlewares/entry');
const { multerStorage } = require('../middlewares/files');

/* GET single entry. */
router.get('/:id', controller.detail);

/* POST new entry. */
router.post('/', multerStorage, entryValidate, controller.create);

/* DELETE single entry. */
router.delete('/:id', controller.delete);

module.exports = router;
