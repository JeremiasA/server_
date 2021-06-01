const express = require('express');
const router = express.Router();
const controller = require('../controllers/user');

router.get('/', controller.getUsers);

router.delete('/:id', controller.delete);

module.exports = router;
