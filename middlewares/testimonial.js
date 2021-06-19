const { body, param } = require('express-validator');
const { getTestimonialById } = require('../repository/testimonial')
const moment = require('moment');

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
    param('id')
        .optional()
        .custom((value, { req }) => {
        return getTestimonialById(value).then((foundedTestimony) => {
            if (!foundedTestimony) {
                req.notExistsError = {}
                return Promise.reject('Testimony does not exists!');
            } else if (foundedTestimony.deletedAt) {
                req.deletedError = {}
                return Promise.reject(`El testimonio de id: ${foundedTestimony.id} había sido eliminado con fecha ${moment
                .utc(foundedTestimony.deletedAt)
                .format('DD-MM-YYYY')}`);
            }
        });
    }),
];
