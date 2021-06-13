const { Contact } = require('../models');
const { Op } = require('sequelize');

const getContacts = () => {
    return Contact.findAll({
        attributes:{ 
            exclude: ['createdAt', 'updatedAt', 'deletedAt'],
        },
        where: {
            deletedAt: {    
                [Op.is]: null,
            },
        },
    });
};

const createContact = (receivedData)=>{
    return Contact.create(receivedData);
};

module.exports = { getContacts, createContact };