const { Router } = require('express');
const {
    getContactsController,
} = require('../controllers/contact');

const verifyAdmin = require('../middlewares/verifyAdmin');

const router = Router();

router.get('/', 
    verifyAdmin, 
    getContactsController
);

module.exports = router;
