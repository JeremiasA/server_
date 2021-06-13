const db = require('../models/index');
const moment = require('moment');

module.exports = usersRepository = {
    getTestimonialById: (testimonialId) => {
        try {
            return db.Testimonial.findByPk(testimonialId);
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    deleteTestimonial: (updateTestimonialData) => {
        const dateNow = moment().format('YYYY-MM-DD');

        const updateTestimonialDelete = {
            ...updateTestimonialData,
            deletedAt: dateNow,
        };

        return updateTestimonialData.update(updateTestimonialDelete, {
            where: {
                id: updateTestimonialData.id,
            },
        });
    },

    createTestimonial: (recievedTestimonialData) => {
        return db.Testimonial.create({
            ...recievedTestimonialData,
        });
    },
};
