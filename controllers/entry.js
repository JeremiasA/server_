const entries_repository = require('../repository/entry');

module.exports = {
    detail: async (req, res) => {
        try {
            let entry = await entries_repository.getSingleEntry(req.params.id);
            if (!entry)
                return res.status(404).json({
                    error: 'Entry not found',
                });
            return res.status(200).json(entry);
        } catch (err) {
            res.status(500).json({ error: err });
        }
    },
};
