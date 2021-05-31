var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth_controllers');
const validate = require('../middlewares/register_validations');
const authValidate = require('../middlewares/auth_validations')

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', validate, controller.register);
router.post('/login', authValidate,  controller.login);


/* GET auth listing. */

module.exports = router;
