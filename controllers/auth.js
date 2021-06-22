const repository = require('../repository/user');
const { validationResult } = require('express-validator');
const { verifyToken, getToken } = require('../services/security');
const bcrypt = require('bcrypt');

module.exports = auth = {
    register: async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
            });
        }

        let user = await repository.getUserByEmail(req.body.email);
        if (user)
            return res.status(401).json({
                error: 'User already exists!',
            });
        try {
            let user = await repository.createUser({
                ...req.body,
                password: bcrypt.hashSync(req.body.password, 10),
            });
            delete user.dataValues.password;
            return res.status(201).json({ user: user, token: getToken(user.id) });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    comparePassword: async (foundedUser, receivedPassword) => {
        const dbPassword = foundedUser.dataValues.password;
        return await bcrypt.compare(receivedPassword, dbPassword);
    },

    login: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const foundedUser = await repository.getUserByEmail(req.body.email);
            if (foundedUser) {
                const result = await auth.comparePassword(
                    foundedUser,
                    req.body.password
                );
                if (result) {
                    foundedUser.dataValues.password = '';
                    return res.status(200).json({
                        msg: 'Usuario logueado correctamente', 
                        user: foundedUser,
                        token: getToken(foundedUser.id) });
                } else {
                    return res.status(401).json({ ok: false, msg: 'La contraseña es incorrecta' });
                }
            } else return res.status(401).json({ ok: false, msg: 'El usuario no existe' });
        } catch (err) {
            return res.status(500).json({ error: err.message });
        }
    },
    getUserInfo: async (req, res) => {
        try {
            const userIdDecoded = verifyToken(req.headers.authorization);

            if (typeof userIdDecoded !== 'number') {
                res.status(401).json({ error: userIdDecoded });
            } else {
                const userFound = await repository.getUserById(userIdDecoded);
                if (!userFound) {
                    throw new Error('UserId does not found');
                } else {
                    const userFound = await repository.getUserById(userIdDecoded);
                    res.status(202).json(userFound);
                } 
            }
        } catch (error) {
            return res.status(500).json({ error: err.message });
        }
    },
};
