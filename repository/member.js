const { Member } = require('../models/index');
const { Op } = require('sequelize');
const moment = require('moment');

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
    deleteMember: async (memberId) => {
        const dateNow = moment().format('YYYY-MM-DD');

        const successSoftDeleted = await Member.update(
            {
                deletedAt: dateNow,
            },
            {
                where: {
                    id: memberId,
                },
            }
        );
        if (successSoftDeleted) {
            return memberId;
        } else {
            throw new Error(`Error deleting Member ${memberId}`);
        }
    },
    createmember: ({ name, image }) => {
        return Member.create({
            name,
            image,
        });
    },
    getMemberById: (memberId) => {
        return Member.findByPk(memberId);
    },
    updateMember: (dataToUpdate, idMember) => {
        return Member.update(dataToUpdate, {
            where: {
                id: idMember,
            },
        });
    },
};
