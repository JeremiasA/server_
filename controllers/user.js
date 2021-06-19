const repository = require('../repository/user');

module.exports = userController = {
    getUsers: async (req, res) => {
        try {
            const usersList = await repository.getUsers();
            if (usersList) return res.status(200).json(usersList);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ error: err.message });
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
                const resultDeleteUser = await repository.deleteUser(
                    userToDelete
                );

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
            res.status(500).json({ msg: 'Error al borrar Usuario', error: error.message});
        }
    },
};
