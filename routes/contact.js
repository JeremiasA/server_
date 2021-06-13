const { Router } = require('express');
const {
    getContactsController, createContactController
} = require('../controllers/contact');
const verifyAdmin = require('../middlewares/verifyAdmin');
const validateContact = require('../middlewares/contact');

const router = Router();

router.get('/', 
    verifyAdmin, 
    getContactsController
);

router.post('/', validateContact, createContactController)

module.exports = router;
