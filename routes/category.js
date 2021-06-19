const express = require('express');
const router = express.Router();
const controller = require('../controllers/category');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validateCategory = require('../middlewares/category');

router.get('/', verifyAdmin, controller.getCategories);
router.post('/', verifyAdmin, validateCategory, controller.addCategory);
router.put('/:id', verifyAdmin, controller.delete);

router.put('/:id', verifyAdmin, validateCategory, controller.updateCategory);

module.exports = router;