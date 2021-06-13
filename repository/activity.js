const { Activity } = require('../models');

const createNewActivity = (newActivityBody) => {
    return Activity.create(newActivityBody);
};

module.exports = { createNewActivity };