const { validationResult } = require('express-validator');
const { createNewActivity, getSingleActivity } = require('../repository/activity');

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
const detailController = async (req, res) => {
    try {
        const activity = await getSingleActivity(req.params.id);
        if(!activity){
            return res.status(404).json({error: 'Not found'})
        }
        return res.status(200).json(activity)
    } catch (error) {
        res.status(500).json({error: 'error'})
    }
}

module.exports = { createNewActivityController, detailController };