const { Member } = require('../models/index');
const { Op } = require('sequelize');

module.exports = {
    getMembers: () => {
        return Member.findAll({
            where: {
                deletedAt: {
                    [Op.is]: null,
                },
            },
        });
    },
    getMemberById: (memberId) => {
        return Member.findByPk(memberId);
    },
    updateMember: (dataToUpdate, idMember) => {
        return Member.update(dataToUpdate, {
            where: {
                id: idMember
            }
        })
    }
};
