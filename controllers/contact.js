const { getContacts, createContact } = require('../repository/contact');
const { validationResult } = require('express-validator');
const { sendMail } = require('../services/mailer');

const getContactsController = async (req, res) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json({error: error.message})
    }
};
const createContactController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const createdContact = await createContact(req.body);
        if (createdContact) {
            await sendMail({
                to: createdContact.email,
                subject: `Thank you ${createdContact.name}`,
                body: `Hi ! ${createdContact.name} thank you for your contact, we will check your request as soon as possible, have a nice day!`,
            });
            return res.status(200).json({
                name: createdContact.name,
                email: createdContact.email,
                phone: createdContact.phone,
                message: createdContact.message,
            });
        }
    } catch (err) {
        return res.status(500).json({error: err.message})
    }
};

module.exports = { getContactsController, createContactController };
