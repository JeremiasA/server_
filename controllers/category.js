const repository = require('../repository/category');
const { validationResult } = require('express-validator');

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
    addCategory: async (req,res)=>{
        
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }
        
        try {
            const newCategory = await repository.addCategory(req.body);
            return res.status(201).json({name: newCategory.name, description: newCategory.description});
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }

    }
};
