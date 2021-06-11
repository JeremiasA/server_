const db = require('../models/index');
const { Op } = require('sequelize');

module.exports = usersRepository = {
    getSingleEntry: (id) => {
        return db.Entry.findOne({
            where: {
                id: id,
                deletedAt: {
                    [Op.is]: null,
                },
            },
            include: [
                {
                    model: db.Category,
                    as: 'categories',
                    attributes: ['name'],
                },
            ],
        });
    },

    createEntry: (recievedEntryData) => {
        return db.Entry.create({
            ...recievedEntryData,
        });
    },

    getEntryType: () => {
        return db.Entry.findAll({
            attributes: ['id', 'name', 'image', 'createdAt'],
            where: {
                type: 'news',
            },
        });
    },

    deleteEntry: (recievedEntry) => {
        updatedEntry = {
            ...recievedEntry,
            deletedAt: Date.now(),
        };
        return db.Entry.update(updatedEntry, {
            where: {
                id: recievedEntry.id,
            },
        });
    },
};
