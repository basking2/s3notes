const StorageInterface = require("./StorageInterface")
const S3 = require('@aws-sdk/client-s3')

class S3Storage extends StorageInterface {
    constructor({bucket, endpoint, region, accessKeyId, secretAccessKey, s3ForcePathStyle}) {
        super()
        this.bucket = bucket
        this.s3 = new S3.S3Client({
            credentials: {
                accessKeyId,
                secretAccessKey
            },
            region,
            endpoint,
            s3ForcePathStyle,
            signatureVersion: 'v4',
        })
    }

    store({key, text, meta}, callback) {
        const op = new S3.PutObjectCommand({Bucket: this.bucket, Key: key, Body: text})
        this.s3.send(op)
            .catch(e => callback(e))
            .then(callback())
    }
}

module.exports = S3Storage