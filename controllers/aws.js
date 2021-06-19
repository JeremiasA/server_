const { getFile, uploadFile } = require('../services/awsS3');

const awsUploadFileController = async (req, res) => {
    try {
        const keyFile = await uploadFile(req.file);
        res.json({ key: keyFile });
    } catch (error) {
        res.status(500).json({errors: error.message});
    }
};

const awsGetFileController = async (req, res) => {
    try {
        const payload = await getFile(req.params.filename);
        payload.on('error', (error) => {
            if (error.code === 'NoSuchKey') {
                res.status(404).json({ error: 'File does not exist' });
            } else {
                res.status(404).json(error);
            }
        });
        payload.pipe(res);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

module.exports = { awsUploadFileController, awsGetFileController };
