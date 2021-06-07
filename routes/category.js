const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.get('/', verifyAdmin, controller.getCategories);

module.exports = router;