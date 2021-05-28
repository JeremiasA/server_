const { Organization } = require('../models')
const { Op } = require('sequelize')

const getSingleOrganization = (id) => {
    return Organization.findByPk(id, {
        attributes: ['name', 'image', 'address', 'welcomeText'],
        where: {
            deletedAt: { [Op.is]: null }
        }
    })
}

module.exports = {getSingleOrganization}
