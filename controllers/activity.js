const validator = require('express-validator');
const repository = require('../repository/activity');

const { uploadFile } = require('../services/awsS3');

const createNewActivityController = async (req, res) => {
    const file = req.file;
    let keyFile = '';
    try {
        const errors = validator.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        if (file === undefined) {
            keyFile = null;
        } else {
            keyFile = await uploadFile(req.file);
        }
        const activityCreated = await repository.createNewActivity({
            ...req.body,
            image: keyFile,
        });
        return res.status(201).json(activityCreated);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};
const detailController = async (req, res) => {
    try {
        const activity = await repository.getActivityById(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json(activity);
    } catch (err) {
        return res.status(500).json({ error: err });
    }
};

const editActivity = async (req, res) => {
    try {
        const activityToEdit = await repository.getActivityById(req.params.id);
        if (!activityToEdit) {
            return res.status(404).json({
                error: 'Activity not found',
            });
        } else if (activityToEdit.deletedAt) {
           return res.status(409).json({
                error: 'This activity is not available',
            });
        } else if (req.file) {
            const imageName = await uploadFile(req.file);
            const updatedActivity = await repository.updateActivity(
                {
                    ...req.body,
                    image: imageName,
                },
                activityToEdit.id
            );
            if (updatedActivity) {
                return res.status(200).json(updatedActivity);
            }
        } else {
            const updatedActivity = await repository.updateActivity(
                req.body,
                activityToEdit.id
            );
            return res.status(200).json(updatedActivity);
        }
    } catch (error) {
        return res.status(500).json({ error: error });
    }
};

module.exports = {
    createNewActivityController,
    editActivity,
    detailController,
};
