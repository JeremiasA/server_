const { body } = require('express-validator');

module.exports = [
    body('name')
        .exists()
        .withMessage('Activity name is required')
        .notEmpty()
        .withMessage('Activity name can not be empty'),
    body('content')
        .exists()
        .withMessage('Activity content is required')
        .notEmpty()
        .withMessage('Activity content can not be empty'),
];
