const { body } = require('express-validator');
const repository = require("../repository/category");

module.exports = [
    body('name')
        .not()
        .isEmpty()
        .withMessage("Category name can't be empty")
        .isAlpha()
        .withMessage('Category name must be a string')
        .custom((value, { req }) => {
            return repository
                .getCategoryByName(value)
                .then((foundedCategory) => {
                    if (foundedCategory) {
                        return Promise.reject('Category already exists!');
                    }
                });
        }),

    function (req, res, next) {
        next();
    },
];
