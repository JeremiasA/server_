const repository = require("../repositories/users_repository");
const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");

module.exports = auth = {
    comparePassword : async (foundedUser, receivedPassword) => {
        const dbPassword = foundedUser.dataValues.password;
        return await bcrypt.compare(receivedPassword, dbPassword);
    },
   
    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        try {
            const foundedUser = await repository.getUserByEmail(req.body.email)
            if (foundedUser) {
                const result = await auth.comparePassword(foundedUser, req.body.password)
                if (result){
                    foundedUser.dataValues.password="";
                    return res.status(200).json(foundedUser);
                }else{
                    return res.status(401).json({ok: false});
                }
            } else return res.status(401).json({ok: false});
        } catch (err) {
            return res.status(500).json({ error: err });
        }
    }
};


 
