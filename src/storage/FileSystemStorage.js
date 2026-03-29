const StorageInterface = require("./StorageInterface");

const storagepack = require('./storagepack')

const fs = require("node:fs")
const path = require("node:path")

/**
 * Store files on the file system. This ignores meta arguments. 
 */
class FileSystemStorage extends StorageInterface {
    constructor({prefix}) {
        super()
        this.prefix = prefix

    }

    ensuredir(key, cb) {
        const d = path.dirname(key)
        fs.mkdir(d, {recursive: true}, cb)
    }

    resolvePath(key) {
        // FIXME - add security
        return path.join(this.prefix, key)
    }

    /**
     * 
     * @param {Object} param0 options, including key, text and meta.
     * @param {function(err)} callback Signal when the file is stored.
     */
    store({key, text, meta}, callback) {
        key = this.resolvePath(key)
        text = storagepack.pack(meta, text)

        this.ensuredir(key, (err, path) => {
            if (err) {
                return callback(err)
            }

            if (text instanceof ArrayBuffer) {
                text = Buffer.from(text)
            }

            fs.writeFile(key, text, {}, callback)
        })
    }

    /**
     * 
     * @param {string} key to load.
     * @param {boolean} loadMeta True, the meta is loaded, false loading meta is optional.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, loadMeta=true, callback) {
        key = this.resolvePath(key)

        this.ensuredir(key, (err, path) => {
            if (err) {
                return callback(err, null)
            }

            fs.readFile(key, {}, (err, fileData) => {
                if (err) {
                    return callback(err, null, null)
                }

                let [meta, data] = storagepack.unpack(fileData)
                callback(null, data, meta)
            })
        })
    }

    delete(key, callback) {
        key = this.resolvePath(key)

        fs.rm(key, callback)
    }
}

module.exports = FileSystemStorage