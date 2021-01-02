
const AWS = require('aws-sdk')

function mks3(opts) {
    const s3 = new AWS.S3({
        accessKeyId: opts.accessKey,
        secretAccessKey: opts.secretKey,
        endpoint: opts.endpoint,
        s3BucketEndpoint: true, // true if endpoint set
        s3DisableBodySigning: true,
        signatureVersion: 'v2',
        computeChecksums: false,
        // sslEnabled: false,
        // port: 9000
    })

    console.info(opts)

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

export default {
    write
}