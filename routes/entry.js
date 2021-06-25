var express = require('express');
var router = express.Router();
const controller = require('../controllers/entry');
const entryValidate = require('../middlewares/entry');
const { multerStorage, extensionValidator } = require('../middlewares/files');

/* GET single entry. */
router.get('/:id', controller.detail);

/* POST new entry. */
router.post('/', multerStorage,extensionValidator, entryValidate, controller.create);

//router para obtener el listado de entries con campo type "news"
router.get('/', controller.listByType);

/* DELETE single entry. */
router.delete('/:id', controller.delete);

router.put('/:id',multerStorage,extensionValidator, controller.editOneNews)

module.exports = router;
