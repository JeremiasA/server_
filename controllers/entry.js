const entries_repository = require('../repository/entry');
const { validationResult } = require('express-validator');
const { uploadFile } = require('../services/awsS3');
const userController = require('./user');

module.exports = {
    detail: async (req, res) => {
        try {
            let entry = await entries_repository.getSingleEntry(req.params.id);
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
            let entry = await entries_repository.createEntry({
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
            const entriesList = await entries_repository.getEntryType();
            
            if (!entriesList){
                res.status(404).json({ msg: 'No hay ningún entries con campo news' });
            }else{
                res.status(200).json(entriesList);
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error al listar los entries', error: error.message });
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
            res.status(500).json({ error: err.message });
        }
    }
};
