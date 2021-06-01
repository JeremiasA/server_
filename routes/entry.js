var express = require('express');
const controller = require('../controllers/entry');
var router = express.Router();

/* GET single entry. */
router.get('/:id', controller.detail);

module.exports = router;
