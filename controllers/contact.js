const { getContacts, createContact } = require('../repository/contact');
const { validationResult } = require('express-validator')

const getContactsController = async (req, res) => {
    try {
        const contacts = await getContacts();
        res.json(contacts);
    } catch (error) {
        res.status(500).json(error.message)
    }
};
const createContactController = async (req, res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    try {
        const createdContact = await createContact(req.body);
        if (createdContact) return res.status(200).json({
            name: createdContact.name,
            email: createdContact.email,
            phone: createdContact.phone,
            message: createdContact.message
        })
        
    } catch (err) {
        return res.status(500).json({error: err})
    }
};

module.exports = { getContactsController, createContactController };