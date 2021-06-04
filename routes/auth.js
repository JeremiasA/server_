var express = require('express');
var router = express.Router();
const controller = require('../controllers/auth');
const validate = require('../middlewares/register');
const authValidate = require('../middlewares/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/register', validate, controller.register);
router.post('/login', authValidate, controller.login);
router.get('/me', authValidate, controller.getUserInfo );


/* GET auth listing. */

module.exports = router;
