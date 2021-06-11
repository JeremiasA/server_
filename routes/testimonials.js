var express = require('express');
var router = express.Router();
const controller = require('../controllers/testimonial');
const verifyAdmin = require('../middlewares/verifyAdmin');

router.delete('/:id', verifyAdmin, controller.delete);

module.exports = router;
