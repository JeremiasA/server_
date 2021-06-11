const repository = require('../repository/testimonial');
const moment = require('moment');

module.exports = {
    delete: async (req, res) => {
        try {
            const testimonialId = req.params.id;
            const testimonialToDelete = await repository.getTestimonialById(testimonialId);
            
            if (!testimonialToDelete) {
                res.status(404).json({
                    error: `El testimonio de id: ${testimonialId} no existe`,
                });
            } else if (testimonialToDelete.deletedAt) {
                res.status(409).json({
                    error: `El testimonio de id: ${testimonialId} había sido eliminado con fecha ${moment.utc(testimonialToDelete.deletedAt).format('DD-MM-YYYY')}`,
                });
            } else {
                const resultDeleteTestimonial = await repository.deleteTestimonial(testimonialToDelete);

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
};
