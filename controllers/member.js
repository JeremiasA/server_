const {
    getMembers,
    deleteMember,
    getMemberById,
    updateMember,
    createmember,
} = require('../repository/member');
const { validationResult } = require('express-validator');
const { uploadFile } = require('../services/awsS3');
const moment = require('moment');

module.exports = {
    list: async (req, res) => {
        try {
            const members = await getMembers();
            if (members) return res.status(200).json(members);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
    delete: async (req, res) => {
        const { params } = req;

        try {
            const memberFound = await getMemberById(params.id);
            if (!memberFound) {
                res.status(404).json({
                    error: `Member ID ${params.id} does not exist `,
                });
            } else if (memberFound.deletedAt !== null) {
                res.status(409).json({
                    error: `Member ID ${
                        params.id
                    } was already deleted at ${moment
                        .utc(memberFound.deletedAt)
                        .format('DD-MM-YYYY')}`,
                });
            } else {
                const softDeletedMember = await deleteMember(params.id);
                res.status(202).json({
                    msg: `Member ID ${softDeletedMember} was deleted successfully`,
                });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    update: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const memberId = req.params.id;
            const memberToUpdate = await getMemberById(memberId);

            if (!memberToUpdate) {
                res.status(404).json({
                    error: `El miembro de id: ${memberId} no existe`,
                });
            } else if (memberToUpdate.deletedAt) {
                res.status(409).json({
                    error: `El miembro de id: ${memberId} había sido eliminado con fecha ${moment
                        .utc(memberToUpdate.deletedAt)
                        .format('DD-MM-YYYY')}`,
                });
            } else {
                let imageMember = null;
                if (req.file) imageMember = await uploadFile(req.file);

                let updateMemberBody = {
                    ...req.body,
                    image: imageMember,
                };

                const memberUpdated = await updateMember(
                    updateMemberBody,
                    memberId
                );
                console.log(memberUpdated);
                if (memberUpdated) {
                    res.status(200).json(
                        `El miembro de id: ${memberId} fue actualizado con éxito`
                    );
                } else {
                    res.status(404).json({
                        error: 'No se pudo actualizar el miembro',
                    });
                }
            }
        } catch (error) {
            res.status(500).json({
                msg: 'Error al actualizar el miembro',
                error,
            });
        }
    },
    create: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            if (req.file) imageName = await uploadFile(req.file);
            else imageName = null;
            const createdMember = await createmember({
                name: req.body.name,
                image: imageName,
            });
            return res.status(201).json(createdMember);
        } catch (error) {
            return res.status(500).json({ error: error });
        }
    },
};
