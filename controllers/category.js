const repository = require('../repository/category');
const { validationResult } = require('express-validator');
const moment = require('moment');

module.exports = categoryController = {
    getCategories: async (req, res) => {
        try {
            const foundedCategories = await repository.getCategories();
            if (foundedCategories.length > 0)
                return res.status(200).json(foundedCategories);
            else
                return res.status(404).json({
                    message: 'No categories were found in the database',
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    },

    addCategory: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        try {
            const newCategory = await repository.addCategory(req.body);
            return res
                .status(201)
                .json({
                    name: newCategory.name,
                    description: newCategory.description,
                });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
        }
    },

    delete: async (req, res) => {
        try {
            const categoryToDelete = await repository.getCategoryById(
                req.params.id
            );
            if (!categoryToDelete) {
                return res.status(404).json({
                    error: 'Category not found',
                });
            } else if (categoryToDelete.deletedAt) {
                res.status(409).json({
                    error: 'This category has already been deleted',
                });
            } else {
                const response = await repository.deleteCategory(
                    categoryToDelete
                );
                if (response) {
                    return res.status(202).json({
                        Msg: `Category id: ${req.params.id} deleted successfully`,
                    });
                }
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    updateCategory: async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const categoryId = req.params.id;
            const categoryToUpdate = await repository.getCategoryById(
                categoryId
            );

            if (!categoryToUpdate) {
                res.status(404).json({
                    error: `La categoría de id: ${categoryId} no existe`,
                });
            } else if (categoryToUpdate.deletedAt) {
                res.status(409).json({
                    error: `La categoría de id: ${categoryId} había sido eliminado con fecha ${moment
                        .utc(categoryToUpdate.deletedAt)
                        .format('DD-MM-YYYY')}`,
                });
            } else {
                let updateCategoryBody = {
                    ...req.body,
                };

                const categoryUpdated = await repository.updateCategory(
                    updateCategoryBody,
                    categoryId
                );

                if (categoryUpdated) {
                    res.status(200).json(
                        `La categoría de id: ${categoryId} fue actualizado con éxito`
                    );
                } else {
                    res.status(404).json({
                        error: 'No se pudo actualizar la categoría',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Error al actualizar la categoría',
                error,
            });
        }
    },
};
