const { getContacts } = require('../repository/contact');

const getContactsController = async (req, res) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json(error.message)
    }
};

module.exports = { getContactsController };