const { Entry, Category } = require('../models/index');
const { Op } = require('sequelize');

module.exports = usersRepository = {
    getSingleEntry: (id) => {
        return Entry.findOne({
            where: {
                id: id,
                deletedAt: {
                    [Op.is]: null,
                },
            },
            include: [
                {
                    model: Category,
                    as: 'categories',
                    attributes: ['name'],
                },
            ],
        });
    },

    createEntry: (recievedEntryData) => {
        return Entry.create({
            ...recievedEntryData,
        });
    },

    getEntryType: () => {
        return Entry.findAll({
            attributes: ['id','content', 'name', 'image', 'createdAt'],
            where: {
                type: 'news',
                deletedAt: {
                    [Op.is]: null
                }
            },
        });
    },

    deleteEntry: (recievedEntry) => {
        updatedEntry = {
            ...recievedEntry,
            deletedAt: Date.now(),
        };
        return Entry.update(updatedEntry, {
            where: {
                id: recievedEntry.id,
            },
        });
    },
    editNews: async (entryId, updatesToDo) => {
        const successUpdated = await Entry.update(updatesToDo, {
            where: {
                id: entryId,
            },
        });
        if (successUpdated) {
            return await Entry.findByPk(entryId);
        } else {
            throw new Error(`Error updating News ID ${entryId}`);
        }
    },
};
