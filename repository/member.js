const db = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    getMembers: () => {
        return db.Member.findAll({
            where: {
                deletedAt: {
                    [Op.is]: null,
                },
            },
        });
    },
};
