const { body } = require('express-validator');

module.exports = [
    body('firstName')
        .exists()
        .withMessage('First name is required')
        .notEmpty()
        .withMessage('First can not be empty'),
    body('lastName')
        .exists()
        .withMessage('Last name is required')
        .notEmpty()
        .withMessage('Last can not be empty'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .notEmpty()
        .withMessage('Email can not be empty')
        .isEmail()
        .withMessage('Email must have a valid email format'),
    body('password')
        .exists()
        .withMessage('Password is required')
        .notEmpty()
        .withMessage('Password can not be empty')
        .isLength({ min: 4 })
        .withMessage('Password min length is 4'),
];
