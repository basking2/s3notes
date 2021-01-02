
// vim: set sw=4 et : 
const fs = require('fs')
const path = require('path')
const AWS = require('aws-sdk')

const bucket = 'data'

const s3 = new AWS.S3({
    accessKeyId: 'minioadmin',
    secretAccessKey: 'minioadmin',
    endpoint: 'http://localhost:9000',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
})

function recursiveWalk(prefix, cb) {

    fs.opendir(prefix, (err, dir) => {
        if (err) {
            dir.close()
            return
        }

        function r(dir) {
            dir.read((err, dent) => {
                if (err) {
                    console.info("e", err)
                    return
                }

                if (dent) {
                    cb(err, prefix, dent)
                    if (dent.isDirectory()) {
                        recursiveWalk(path.join(prefix, dent.name), cb)
                    }
                    r(dir)
                }
            })
        }

        r(dir)

    })
}

function mimetype(m) {
    if (m.endsWith('.txt')) { return 'text/plain' }
    if (m.endsWith('.css')) { return 'text/css' }
    if (m.endsWith('.js')) { return 'text/javascript' }
    if (m.endsWith('.html')) { return 'text/html' }
    if (m.endsWith('.jpg')) { return 'image/jpeg' }
    if (m.endsWith('.png')) { return 'image/png' }
    if (m.endsWith('.svg')) { return 'image/svg-xml' }

    return 'application/octet-stream'
}

var prefix = 'dist'

recursiveWalk('dist', (err, pardir, dent) => {
    if (err) {
        console.error(err)
        return
    }

    if (dent.isDirectory()) {
        return;
    }

    var p = path.join(pardir, dent.name)
    var body = fs.readFileSync(p)
    p = p.substr(prefix.length+1)
    console.info(`Sending ${p}.`)


    s3.putObject({
        Bucket: bucket,
        Body: body,
        Key: p,
        ACL:'public-read',
        'ContentType': mimetype(p),
        Metadata: {
          'iv1': "None"
        }
    },
    (e, d) => {
        //console.info(e)
        //console.info(d)
    })
})
