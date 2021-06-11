const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validateCategory = require('../middlewares/category');

router.get('/', verifyAdmin, controller.getCategories);
router.post('/', verifyAdmin, validateCategory, controller.addCategory);

module.exports = router;