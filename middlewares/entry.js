const { body } = require('express-validator');

module.exports = [
    body('name')
        .exists()
        .withMessage('Entry name is required')
        .notEmpty()
        .withMessage('Entry name can not be empty'),
    body('content')
        .exists()
        .withMessage('Content is required')
        .notEmpty()
        .withMessage('Content can not be empty'),
];
