const { Router } = require('express');
const {
    getSingleOrganizationController,
} = require('../controllers/organization');

const router = Router();

router.get('/:id/public', getSingleOrganizationController);

module.exports = router;
