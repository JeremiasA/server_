const { getSingleOrganization } = require('../repository/organization');

const getSingleOrganizationController = async (req, res) => {
    try {
        const organizationFound = await getSingleOrganization(req.params.id);
        if (!organizationFound) {
            res.status(404).json({ error: 'Organization was not found' });
        } else {
            res.send(organizationFound);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { getSingleOrganizationController };
