
// vim: set sw=4 et : 
const fs = require('node:fs')
const path = require('node:path')
const process = require('node:process')
const yargs = require('yargs')
const { hideBin } = require('yargs/helpers')

global.self = {}
const EncryptedStorage  = require("../src/storage/EncryptedStorage")
const FileSystemStorage  = require("../src/storage/FileSystemStorage")
const { ContactlessOutlined } = require('@mui/icons-material')

const settings = {

}

/**
 * @param {string} file 
 */
function fileTypeFromName(file) {
    if (file.endsWith(".adoc") || file.endsWith(".asciidoc")) {
        return 'adoc'
    } else if (file.endsWith(".md") || file.endsWith(".markdown")) {
        return 'md'
    } else if (file.endsWith(".js") || file.endsWith(".json")) {
        return 'json'
    }

    return 'txt'
}

function encrypt(argv) {
    let storage = new FileSystemStorage({prefix: argv.dir})
    storage = new EncryptedStorage({storage, password: argv.password})

    for (const file of argv._.slice(1)) {
        const meta = { encrypt: true, filetype: fileTypeFromName(file) }
        const text = fs.readFileSync(file, "utf-8")
        const key = path.basename(file)
        storage.store({key, text, meta}, err => {
            if (err) {
                console.error(err)
            }
        })
    }
}

function decrypt(argv) {
    let storage = new FileSystemStorage({prefix: argv.dir})
    storage = new EncryptedStorage({storage, password: argv.password})

    for (const file of argv._.slice(1)) {
        const key = path.basename(file)
        storage.load(key, true, (err, text, meta) => {
            if (err) {
                return console.error(err)
            }

            console.info(text, meta)
        })
    }
}


var argv = yargs(hideBin(process.argv))
    .scriptName("crypttool")
    .usage('$0 <cmd> [options] [files]')
    .alias("-h", "--help")

    .nargs('password', 1)
    .alias('p', 'password')
    .describe('password', 'Use this as the password.')
    .default('password', 'secret')

    .nargs('dir', 1)
    .alias('d', 'dir')
    .describe('dir', 'dir to store files in.')
    .default('dir', 'crypttool.out')

    .command('encrypt', 'Encrypt a file.', yargs => {
            return yargs
        },
        encrypt)
    .command('decrypt', 'Decrypt a file.', yargs => {
            return yargs
        },
        decrypt)
    .help()
    .argv

