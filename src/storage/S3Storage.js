const StorageInterface = require("./StorageInterface")
const S3 = require('@aws-sdk/client-s3')
const storagepack = require('./storagepack')

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
        text = storagepack.pack(meta, text)
        const op = new S3.PutObjectCommand({Bucket: this.bucket, Key: key, Body: text})
        this.s3.send(op)
            .then(callback())
            .catch(e => callback(e))
    }

    /**
     * 
     * @param {string} key to load.
     * @param {boolean} fetchMeta If true, the meta value is loaded (default). If false, it may be skipped.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, fetchMeta=true, callback) {
        const op = new S3.GetObjectCommand({Bucket: this.bucket, Key: key})
        this.s3.send(op)
            .then(obj => {
                let [meta, text] = storagepack.unpack(obj.Body)
                callback(null, text, meta)
            })
            .catch(e=>callback(e))
    }
}

module.exports = S3Storage