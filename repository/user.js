const db = require('../models/index');
const { Op } = require('sequelize');
const moment = require('moment');

module.exports = usersRepository = {
    getUsers: () => {
        return db.User.findAll({
            attributes: ['id','firstName', 'lastName', 'email', 'image'],
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
            return db.User.findByPk(userId, { include: ['role'] });
        } catch (error) {
            console.log(error);
            return error;
        }
    },
    getUserById: (id) => {
        return db.User.findOne({
            where: {
                id: id,
                deletedAt: {
                    [Op.is]: null,
                }
            },
            attributes: [
                        "firstName", 
                        "lastName", 
                        "email", 
                        "image",
                        "roleId"
                    ]
        })
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
