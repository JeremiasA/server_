const express = require('express');
const router = express.Router();
const controller = require('../controllers/user_controller')

router.get('/', controller.getUsers);

module.exports = router;
