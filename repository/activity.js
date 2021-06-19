const { Activity } = require('../models');

const createNewActivity = (newActivityBody) => {
    return Activity.create(newActivityBody);
};

const getActivityById = (id) => {
    return Activity.findOne({
        where: {
            id: id
        }
    })
}

const updateActivity = async (receivedData, id) => {
    try {
        await Activity.update(receivedData, {
            where: {
                id: id
            }
        })
        return Activity.findByPk(id);

    } catch (error) {
        throw new Error(error);
    }
}

module.exports = { createNewActivity, getActivityById, updateActivity };
