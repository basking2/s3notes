const StorageInterface = require("./StorageInterface")
const S3 = require('@aws-sdk/client-s3')
const storagepack = require('./storagepack')

class S3Storage extends StorageInterface {
    constructor({bucket, endpoint, region, accessKeyId, secretAccessKey, s3ForcePathStyle}) {
        super()
        this.bucket = bucket
        this.prefix = ""
        const clientOpts = {
            region,
            endpoint,
            s3ForcePathStyle,
            signatureVersion: 'v4',
        }

        if (accessKeyId && secretAccessKey) {
            clientOpts.credentials = {
                accessKeyId,
                secretAccessKey
            }
        }

        if (s3ForcePathStyle) {
            clientOpts.endpointProvider = (params, context) => {
                return endpoint
            }
        }

        this.s3 = new S3.S3Client(clientOpts)
    }

    store({key, text, meta}, callback) {
        text = storagepack.pack(meta, text)
        const op = new S3.PutObjectCommand({Bucket: this.bucket, Key: `${this.prefix}${key}`, Body: text})
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
        const op = new S3.GetObjectCommand({Bucket: this.bucket, Key: `${this.prefix}${key}`})
        this.s3.send(op)
            .then(obj => obj.Body.transformToString())
            .then(body => {
                let [meta, text] = storagepack.unpack(body)
                callback(null, text, meta)
            })
            .catch(e=>{
                if (e instanceof S3.NoSuchKey) {
                    let text = ''
                    let meta = {not_found: true}
                    return callback(null, text, meta)
                }
                
                return callback(e)
            })
    }

    delete(key, callback) {
        const op = new S3.DeleteObjectCommand({Bucket: this.bucket, Key: `${this.prefix}${key}`})
        this.s3.send(op)
            .then(obj => callback())
            .catch(callback)
    }
}

module.exports = S3Storage