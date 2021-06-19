const db = require('../models/index');
const { Op } = require('sequelize');

module.exports = categoryRepository = {
    getCategories: () => {
        return db.Category.findAll({
            attributes: ['id','name'],
            where: {
                deletedAt: {
                    [Op.is]: null,
                },
            },
        });
    },
    addCategory: (receivedData) => {
        return db.Category.create(receivedData);
    },
    getCategoryByName:(receivedName) => {
        return db.Category.findOne({where:{name:receivedName}})
    },
    getCategoryById: (categoryId) => {
        return db.Category.findByPk(categoryId);
    },
    updateCategory: (dataToUpdate, idCategory) => {
        return db.Category.update(dataToUpdate, {
            where: {
                id: idCategory
            }
        })
    }
};
