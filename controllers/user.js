const repository = require('../repository/user');
const { verifyToken } = require('../services/security');

module.exports = userController = {
    tokenComprobation: (authorization) => {
        if (authorization) {
            const token = authorization.split(' ')[1];
            return verifyToken(token);
        } else {
            return false;
        }
    },

    obtainRole: (userId) => {
        return repository.getUserRole(userId);
    },

    getUsers: async (req, res) => {
        const userId = userController.tokenComprobation(
            req.headers['authorization']
        );
        if (!userId)
            return res.status(401).json({ ok: false, msg: 'Invalid token' });

        try {
            const foundedUser = await userController.obtainRole(userId);
            if (!foundedUser || foundedUser.role.name !== 'Admin')
                return res
                    .status(401)
                    .json({
                        ok: false,
                        msg: 'only administrators can list users',
                    });

            const usersList = await repository.getUsers();
            if (usersList) return res.status(200).json(usersList);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err });
        }
    },

    delete: async (req, res) => {
        try {
            const userId = req.params.id;
            const userToDelete = await repository.getUserByPK(userId);

            if (!userToDelete) {
                //cuando el id no se encuentra en la base de datos
                res.status(404).json({
                    error: `El usuario de id: ${userId} no existe`,
                });
            } else if (userToDelete.deletedAt) {
                //el usuario ya habia sido eliminado
                res.status(404).json({
                    error: `El usuario de id: ${userId} había sido eliminado con fecha ${userToDelete.deletedAt}`,
                });
            } else {
                const resultDeleteUser = await repository.deleteUser(userToDelete);

                if (resultDeleteUser) {
                    res.status(200).json(
                        `El usuario de id: ${userId} fue eliminado con éxito`
                    );
                } else {
                    res.status(404).json({
                        error: 'No se pudo borrar el usuario',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({ msg: 'Error al borrar Usuario', error });
        }
    },
};
