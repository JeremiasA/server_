var express = require('express');
var router = express.Router();
const controller = require('../controllers/user_controller');

router.get('/', controller.getUsers);

router.delete('/:id', controller.delete);

module.exports = router;
