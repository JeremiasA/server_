const express = require('express');
const router = express.Router();
const controller = require('../controllers/member');

/* GET all members. */
router.get('/', controller.list);

module.exports = router;