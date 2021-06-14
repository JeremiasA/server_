const db = require('../models/index');
const moment = require('moment');
const { Op } = require('sequelize');

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
    modifyTestimony: async (testimonyId, receivedData) => {
        await db.Testimonial.update({
            name: receivedData.name,
            content: receivedData.content,
            image: receivedData.image
        },{
            where: {
                id: testimonyId,
                deletedAt: { [Op.is]: null },
            }
        });
        return db.Testimonial.findByPk(testimonyId);
    },
};
