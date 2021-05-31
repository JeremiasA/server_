const db = require('../models/index');
const { Op } = require('sequelize');

module.exports = usersRepository = {
    getSingleEntry: (id) => {
        return db.Entry.findByPk(id, {
            include: [
                {
                    model: db.Category,
                    as: 'categories',
                    attributes: ['name'],
                },
            ],
        });
    },
};
