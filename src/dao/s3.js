
const AWS = require('aws-sdk')

function mks3(opts) {
    const s3 = new AWS.S3({
        accessKeyId: opts.accessKey,
        secretAccessKey: opts.secretKey,
        endpoint: opts.endpoint,
        s3ForcePathStyle: true,
        signatureVersion: 'v4',
    })

    return s3
}

export function write(opts, cb) {
    const s3 = mks3(opts)
    const metadata = {}
    const req = {
        Key: "data/"+opts.name,
        Body: opts.body,
        Bucket: opts.bucket,
        'ContentType': opts.content_type || 'text/plain'
    }

    if ('salt' in opts && opts.salt) {
        metadata.salt = opts.salt
    }
    if ('iv1' in opts && opts.iv1) {
        metadata.iv1 = opts.iv1
    }
    if ('iv2' in opts && opts.iv2) {
        metadata.iv2 = opts.iv2
    }
    if ('key' in opts && opts.key) {
        metadata.key = opts.key
    }
    if ('cipher' in opts && opts.cipher) {
        metadata.cipher = opts.cipher
    }

    if ('ispublic' in opts && opts.ispublic) {
        metadata.ispublic = 'true'
        req.ACL = 'public-read'
    }

    req.Metadata = metadata

    s3.putObject(req, cb)
}

export function read(opts, cb) {
    const s3 = mks3(opts)
    
    s3.getObject(
        {
            Key: "data/"+opts.name,
            Bucket: opts.bucket
        },
        (err, data) => {
            if (err) {
                cb(err, data)
            } else {
                cb(err, {
                    ... data.Metadata,
                    content_type: data.ContentType || 'text/plain',
                    name: opts.name,
                    body: new TextDecoder("utf-8").decode(data.Body)
                })
            }
        }
    )
}

export default {
    write,
    read
}