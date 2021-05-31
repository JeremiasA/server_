const AWS = require('aws-sdk');
const mimeType = require('mime-types');

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const uploadFile = async (file) => {
    const imageName = `${Date.now()}.${mimeType.extension(file.mimetype)}`;

    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: imageName,
        Body: file.buffer,
    };
    try {
        const { key } = await s3.upload(params).promise();
        return key;
    } catch (error) {
        throw new Error(error);
    }
};

const getFile = (filename) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: filename,
    };
    try {
        return s3.getObject(params).createReadStream();
    } catch (error) {
        throw new Error(error);
    }
};

module.exports = { uploadFile, getFile };
