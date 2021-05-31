const repository = require("../repository/users_repository");
const { verifyToken } = require("../services/security");

module.exports = userController = {
   
    tokenComprobation: (authorization)=>{
        if(authorization){
            const token = authorization.split(' ')[1] 
            return verifyToken(token)
        } else{
            return false;
        }
    },

    obtainRole: (userId) =>{
        return repository.getUserRole(userId);
    },
    
    getUsers: async (req, res) => {
        
        const userId = userController.tokenComprobation(req.headers["authorization"])   
        if(!userId) return res.status(401).json({ok: false, msg: "Invalid token"})

        try {
        
            const foundedUser = await userController.obtainRole(userId)
            if (!foundedUser || foundedUser.role.name!=="Admin") return res.status(401).json({ok: false, msg: "only administrators can list users"})
            
            const usersList = await repository.getUsers();
            if (usersList) return res.status(200).json(usersList);
        
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: err });
        }
    }
};
