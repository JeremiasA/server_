const { getUserRole } = require('../repository/user');
const { verifyToken } = require('../services/security');

//middleware para verificar que el usuario sea admin
module.exports = async (req, res, next) => {
    try {
        let token = req.headers['authorization'];

        if (!token) {
            return res
                .status(401)
                .json({ ok: false, msg: 'No tienes autorización' });
        } else {
            const bearerToken = token.split(' ')[1];
            //utilizo el servicio para verificar el token
            const userId = await verifyToken(bearerToken);

            if (isNaN(userId)) {
                return res
                    .status(401)
                    .json({ ok: false, msg: 'Token inválido' });
            } else {
                //obtengo el rol del usuario
                const roleAdmin = await getUserRole(userId);

                if (!roleAdmin || roleAdmin.role.id !== 1)
                    return res.status(401).json({
                        ok: false,
                        msg: 'Sólo los administradores tienen acceso',
                    });
            }
        }

        next();
    } catch (error) {
        res.status(500).json({ msg: 'Error verificar admmin', error });
    }
};
