const repository = require('../repository/category');

module.exports = categoryController = {
    getCategories: async (req, res) => {
        try {
            const foundedCategories = await repository.getCategories();
            if (foundedCategories.length > 0)
                return res.status(200).json(foundedCategories);
            else
                return res
                    .status(404)
                    .json({
                        message: 'No categories were found in the database',
                    });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
    },
};
