const { body } = require('express-validator');

module.exports = [
    body('email')
        .exists()
        .withMessage('Email required!')
        .not()
        .isEmpty()
        .withMessage("Email can't be empty")
        .isEmail()
        .withMessage('Email must have a valid email format'),

    body('password')
        .exists()
        .withMessage('Password required!')
        .not()
        .isEmpty()
        .withMessage("Password can't be empty")
        .isLength({ min: 4 })
        .withMessage('Password min length is 4'),

    function (req, res, next) {
        next();
    },
];
