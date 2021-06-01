const db = require('../models/index');
const { User } = require('../models');
const moment = require('moment');
const { Op } = require('sequelize');

module.exports = usersRepository = {
    getUsers: () => {
        return db.User.findAll({
            attributes: ['firstName', 'lastName', 'email', 'image'],
            where: {
                deletedAt: {
                    [Op.is]: null,
                },
            },
        });
    },

    getUserRole: async (userId) => {
        return (foundedUser = await db.User.findByPk(userId, {
            include: [{ model: db.Role, as: 'role' }],
        }));
    },

    getUserByEmail: (receivedEmail) => {
        return db.User.findOne({ where: { email: receivedEmail } });
    },

    createUser: (recievedUserData) => {
        return db.User.create({
            ...recievedUserData,
        });
    },

    getUserByPK: async (userId) => {
        try {
            return await User.findByPk(userId, { include: ['role'] });
        } catch (error) {
            console.log(error);
            return error;
        }
    },

    deleteUser: (updateUserData) => {
        //Obtengo la fecha actual
        let dateNow = moment().format('YYYY-MM-DD');

        //agrego la fecha al campo deletedAt
        const updateUserDelete = {
            ...updateUserData,
            deletedAt: dateNow,
        };

        return updateUserData.update(updateUserDelete, {
            where: {
                id: updateUserData.id,
            },
        });
    },
};
