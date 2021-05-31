const db = require('../models/index');

module.exports = usersRepository = {
    getUserByEmail: (receivedEmail) => {
        return db.User.findOne({ where: { email: receivedEmail } });
    },

    createUser: (recievedUserData) => {
        return db.User.create({
            ...recievedUserData,
        });
    },
};
