var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth_controllers');
const validate = require('../middlewares/auth_validations')

/* GET auth listing. */
router.post('/login', validate,  controller.login);

module.exports = router;