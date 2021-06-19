const repository = require('../repository/testimonial');
const moment = require('moment');
const { uploadFile } = require('../services/awsS3');
const { validationResult } = require('express-validator');

module.exports = {
    delete: async (req, res) => {
        try {
            const testimonialId = req.params.id;
            const testimonialToDelete = await repository.getTestimonialById(
                testimonialId
            );

            if (!testimonialToDelete) {
                res.status(404).json({
                    error: `El testimonio de id: ${testimonialId} no existe`,
                });
            } else if (testimonialToDelete.deletedAt) {
                res.status(409).json({
                    error: `El testimonio de id: ${testimonialId} había sido eliminado con fecha ${moment
                        .utc(testimonialToDelete.deletedAt)
                        .format('DD-MM-YYYY')}`,
                });
            } else {
                const resultDeleteTestimonial =
                    await repository.deleteTestimonial(testimonialToDelete);

                if (resultDeleteTestimonial) {
                    res.status(200).json(
                        `El testimonio de id: ${testimonialId} fue eliminado con éxito`
                    );
                } else {
                    res.status(404).json({
                        error: 'No se pudo borrar el testimonio',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error al borrar Testimonio', error });
        }
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const imageName = await uploadFile(req.file);
            let testimonial = await repository.createTestimonial({
                ...req.body,
                image: imageName,
            });
            return res.status(201).json(testimonial);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
    modifyTestimony: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            if(req.deletedError) {
                return res.status(409).json({ errors: errors.array() });
            }else if(req.notExistsError){
                return res.status(404).json({ errors: errors.array() });
            } else {
                return res.status(400).json({ errors: errors.array() });
            }
        }
        try {
           const imageName = await uploadFile(req.file);
           req.body.image = imageName;
           const modifiedTestimony = await repository.modifyTestimony(req.params.id, req.body);
           return res.status(200).json(modifiedTestimony);
        } catch (err) {
            console.log(err)
            res.status(500).json({ error: err.message });
        }
    }
};
