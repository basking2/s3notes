
// vim: set sw=4 et : 
const fs = require('fs')
const path = require('path')
const process = require('process')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')
const AWS = require('aws-sdk')

var prefix = 'dist'

var argv = yargs(hideBin(process.argv))
    .usage('Usage: $0 [options]')
    .help('h')
    .alias('h', 'help')
    
    .nargs('s', 1)
    .alias('s', 'secretAccessKey')
    .describe('s', 'Set the secret access key.')
    .default('s', 'minioadmin')

    .nargs('i', 1)
    .alias('i', 'accessKeyId')
    .describe('i', 'The access key ID.')
    .default('i', 'minioadmin')

    .nargs('e', 1)
    .alias('e', 'endpoint')
    .describe('e', 'Set the endpoint.')
    .default('e', 'http://localhost:9000')

    .nargs('b', 1)
    .alias('b', 'bucket')
    .describe('b', 'Set the S3 bucket.')
    .default('b', 'data')

    .argv

const bucket = argv.bucket

const s3 = new AWS.S3({
    accessKeyId: argv.accessKeyId || 'minioadmin',
    secretAccessKey: argv.secretAccessKey || 'minioadmin',
    endpoint: argv.endpoint || 'http://localhost:9000',
    s3ForcePathStyle: true,
    signatureVersion: 'v4',
})

function recursiveWalk(prefix, cb) {

    fs.opendir(prefix, (err, dir) => {
        if (err) {
            if (dir) {
                dir.close()
            }
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
                } else {
                    // No more directory entries! Close.
                    dir.close()
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
