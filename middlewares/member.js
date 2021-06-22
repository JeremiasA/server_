const { body } = require('express-validator');
module.exports = [
    body('name')
        .exists()
        .withMessage('Member name is required!')
        .not()
        .isEmpty()
        .withMessage("Member name can't be empty")
        .isAlpha('es-ES', { ignore: ' ' })
        .withMessage('Member name must be a string'),

    function (req, res, next) {
        next();
    },
];
