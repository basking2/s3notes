
const S3 = require('@aws-sdk/client-s3')

console.info("Running.")

const endpoint = 'https://s3.us-east.cloud-object-storage.appdomain.cloud/basking2'
const s3Client = new S3.S3Client({
    endpoint,
    region: "us-east-1",
    signatureVersion: 'v4',
    endpointProvider: (params, context) => {
        return endpoint
    }
})

const go = new S3.GetObjectCommand({
    Bucket: 'basking2',
    Key: 'index.html',
})

s3Client.send(go)
    .then(res => console.info(`Result ${JSON.stringify(res, 2,2)}.`))
    .catch(err => console.error(`Error ${err}`))

