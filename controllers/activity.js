const { validationResult } = require('express-validator');
const {
    createNewActivity,
    getActivityById,
    updateActivity,
} = require('../repository/activity');

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
        const activity = await getActivityById(req.params.id);
        if (!activity) {
            return res.status(404).json({ error: 'Not found' });
        }
        return res.status(200).json(activity);
    } catch (error) {
        res.status(500).json({ error: 'error' });
    }
};

const editActivity = async (req, res) => {
    try {
        const activityToEdit = await getActivityById(req.params.id);
        if (!activityToEdit) {
            return res.status(404).json({
                error: 'Activity not found',
            });
        } else if (activityToEdit.deletedAt) {
            res.status(409).json({
                error: 'This activity is not available',
            });
        } else if (req.file) {
            const imageName = await uploadFile(req.file);
            const updatedActivity = await updateActivity(
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
            const updatedActivity = await updateActivity(
                req.body,
                activityToEdit.id
            );
            return res.status(200).json(updatedActivity);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createNewActivityController,
    editActivity,
    detailController,
};
