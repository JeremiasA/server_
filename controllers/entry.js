const {
    createEntry,
    deleteEntry,
    editNews,
    getEntryType,
    getSingleEntry,
} = require('../repository/entry');
const { validationResult } = require('express-validator');
const { uploadFile } = require('../services/awsS3');
const moment = require('moment');

module.exports = {
    detail: async (req, res) => {
        try {
            let entry = await getSingleEntry(req.params.id);
            if (!entry)
                return res.status(404).json({
                    error: 'Entry not found',
                });
            return res.status(200).json(entry);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const imageName = await uploadFile(req.file);
            let entry = await createEntry({
                ...req.body,
                image: imageName,
                type: 'news',
            });
            return res.status(201).json(entry);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    listByType: async (req, res) => {
        try {
            const entriesList = await getEntryType();

            if (!entriesList) {
                res.status(404).json({
                    msg: 'No hay ningún entries con campo news',
                });
            } else {
                res.status(200).json(entriesList);
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Error al listar los entries',
                error: error.message,
            });
        }
    },

    delete: async (req, res) => {
        try {
            const entryToDelete = await getSingleEntry(req.params.id);
            if (!entryToDelete) {
                return res.status(404).json({
                    error: 'Entry not found',
                });
            } else if (entryToDelete.deletedAt) {
                res.status(400).json({
                    error: 'This entry has already been deleted',
                });
            } else {
                const response = await deleteEntry(entryToDelete);
                if (response) {
                    return res.status(202).json({
                        Msg: `Entry id: ${req.params.id} deleted successfully`,
                    });
                }
            }
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    editOneNews: async (req, res) => {
        const {
            params: { id },
            body,
        } = req;
        try {
            const newsFound = await getSingleEntry(id);

            if (!newsFound) {
                res.status(404).json({
                    error: `News ID ${id} does not exist`,
                });
            } else if (newsFound.deletedAt !== null) {
                res.status(409).json({
                    error: `News ID ${id} was deleted at ${moment
                        .utc(newsFound.deletedAt)
                        .format('DD-MM-YYYY')}`,
                });
            } else if (!req.file) {
                const editedNews = await editNews(id, body);
                res.status(202).json(editedNews);
            } else {
                const key = await uploadFile(req.file);
                const editedNews = await editNews(id, {
                    ...body,
                    image: key,
                });
                res.status(202).json(editedNews)
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};
