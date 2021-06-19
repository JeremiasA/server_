const { Activity } = require('../models');

const createNewActivity = (newActivityBody) => {
    return Activity.create(newActivityBody);
};

const getSingleActivity = (id) => {
    return Activity.findOne({where: {
        id: id
    }})
}
module.exports = { createNewActivity, getSingleActivity };