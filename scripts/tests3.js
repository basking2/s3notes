
const AWS = require('aws-sdk')

const s3 = new AWS.S3({
    accessKeyId: 'minioadmin',
    secretAccessKey: 'minioadmin',
    endpoint: 'http://localhost:9000',
    s3ForcePathStyle: true,
    //s3BucketEndpoint: true,
    //s3DisableBodySigning: true,
    signatureVersion: 'v4',
    //computeChecksums: false,
    //sslEnabled: false,
    // port: 9000
})

s3.putObject({
    Bucket: 'data',
    Body: 'This is the test body.',
    Key: 'test.txt',
    ACL:'public-read',
    'ContentType': 'text/plain',
    Metadata: {
      'iv1': "None"
    }
},
(e, d) => {
    console.info(e)
    console.info(d)
})

