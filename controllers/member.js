const repository = require('../repository/member');

module.exports = {
    list: async (req, res) => {
        try {
            let members = await repository.getMembers();
            if (members) return res.status(200).json(members);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};
