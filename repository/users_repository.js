const db = require("../models/index");
const { Op } = require("sequelize")

module.exports = usersRepository = {
    
    getUsers: () => {
        return db.User.findAll({
            attributes:["firstName", "lastName", "email", "image"],
            where:{
                deletedAt:{
                    [Op.is]:null
                }
                }
            });
    },

    getUserRole: async (userId) =>{
        return foundedUser = await db.User.findByPk(userId,{
            include: [{ model: db.Role, as: 'role' }]
        });
        
    },
    

    getUserByEmail: (receivedEmail) => {
        return db.User.findOne({ where: { email: receivedEmail } });
    },

    createUser: (recievedUserData) => {
        return db.User.create({
            ...recievedUserData,
        });
    },
};
