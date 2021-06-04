const jwt = require('jsonwebtoken');
//requiero config para usar la variable de entorno de secret
const config = require('../config/config');
const moment = require('moment');

const security = {
    getToken: (userId) => {
        //el token puse que caduque en 14 dias
        return jwt.sign({ user: userId }, config.SECRET_TOKEN, {
            expiresIn: '14d',
        });
    },
    verifyToken: (token) => {
        try {
            // pregunto si el token no es null, ni undefined, ni vacío
            if (token) {
                const decoded = jwt.verify(token, config.SECRET_TOKEN);

                if (decoded.exp <= moment().unix()) {
                    throw new Error('El token ha expirado');
                }

                //en caso exitoso devuelvo el id
                return decoded.user;
            } else {
                throw new Error('El token es incorrecto');
            }
        } catch (error) {
            if (error.message == 'jwt must be a string') {
                error.message = 'El token no existe';
            } else if (error.message == 'jwt expired') {
                error.message = 'El token ha expirado';
            } else if (error.message == 'invalid signature'){
                error.message = 'El token es incorrecto'
            }
                return error.message;
        }
    },
};

module.exports = security;
