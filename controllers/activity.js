const { validationResult } = require('express-validator');
const { createNewActivity } = require('../repository/activity');

const { uploadFile } = require('../services/awsS3');

const createNewActivityController = async (req, res) => {
    const file = req.file;
    let keyFile = '';

    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (file === undefined) {
            keyFile = null;
        } else {
            keyFile = await uploadFile(req.file);
        }
        const activityCreated = await createNewActivity({
            ...req.body,
            image: keyFile,
        });
        res.status(201).json(activityCreated);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { createNewActivityController };
