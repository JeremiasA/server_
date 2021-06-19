const { body } = require('express-validator');

module.exports = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .notEmpty()
        .withMessage('Name can not be empty'),
    body('email')
        .exists()
        .withMessage('Email is required')
        .notEmpty()
        .withMessage('Email can not be empty')
        .isEmail()
        .withMessage('Email format is not valid'),
    body('phone')
        .optional()
        .notEmpty()
        .withMessage('Phone can not be empty')
        .isNumeric()
        .withMessage('Please enter a valid phone number'),
    body('message')
        .exists()
        .withMessage('Message is required')
        .notEmpty()
        .withMessage('Messsage can not be empty'),
];