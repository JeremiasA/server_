const entries_repository = require('../repository/entry');
const { validationResult } = require('express-validator');
const { uploadFile } = require('../services/awsS3');

module.exports = {
    detail: async (req, res) => {
        try {
            let entry = await entries_repository.getSingleEntry(req.params.id);
            if (!entry)
                return res.status(404).json({
                    error: 'Entry not found',
                });
            return res.status(200).json(entry);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    create: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const imageName = await uploadFile(req.file);
            let entry = await entries_repository.createEntry({
                ...req.body,
                image: imageName,
                type: 'news',
            });
            return res.status(201).json(entry);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },

    delete: async (req, res) => {
        try {
            const entryToDelete = await entries_repository.getSingleEntry(
                req.params.id
            );
            if (!entryToDelete) {
                return res.status(404).json({
                    error: 'Entry not found',
                });
            } else if (entryToDelete.deletedAt) {
                res.status(400).json({
                    error: 'This entry has already been deleted',
                });
            } else {
                const response = await entries_repository.deleteEntry(
                    entryToDelete
                );
                if (response) {
                    return res.status(202).json({
                        Msg: `Entry id: ${req.params.id} deleted successfully`,
                    });
                }
            }
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};
