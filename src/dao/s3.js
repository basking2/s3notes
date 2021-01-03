
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

    metadata['iv1'] = opts.iv1
    metadata['iv2'] = opts.iv2
    metadata['salt'] = opts.salt
    metadata['cipher-name'] = opts['cipher-name']

    s3.putObject(
        {
            Key: "data/"+opts.name,
            Body: opts.body,
            Bucket: opts.bucket,
            'ContentType': 'text/html',
            Metadata: metadata
        },
        cb
    )
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
                    iv1: data.Metadata.iv1,
                    iv2: data.Metadata.iv2,
                    salt: data.Metadata.salt,
                    'cipher-name': data.Metadata['cipher-name'],
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