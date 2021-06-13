const { body } = require('express-validator');

module.exports = [
    body('name')
        .exists()
        .withMessage('Name is required')
        .notEmpty()
        .withMessage('Name can not be empty'),
    body('content')
        .exists()
        .withMessage('Content is required')
        .notEmpty()
        .withMessage('Content can not be empty'),
];
