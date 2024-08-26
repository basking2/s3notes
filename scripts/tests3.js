
const S3 = require('@aws-sdk/client-s3')


const s3Client = new S3.S3Client({
    endpoint: 'http://localhost:9000/data',
    bucketEndpoint: false,
    s3ForcePathStyle: true,
    region: "us-east-1",
    signatureVersion: 'v4',
    credentials: {
            accessKeyId: 'minioadmin',
            secretAccessKey: 'minioadmin',
    },
})

const po = new S3.PutObjectCommand({
    Bucket: 'data',
    Body: 'This is the test body.',
    Key: 'test.txt',
    ACL:'public-read',
    'ContentType': 'text/plain',
    Metadata: {
      'iv1': "None"
    }
})

s3Client.send(po)
    .then(res => console.info(`Result ${JSON.stringify(res, 2,2)}.`))
    .catch(err => console.error(`Error ${err}`))
