const StorageInterface = require("./StorageInterface");

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
        return path.join(this.prefix, key)
    }

    /**
     * 
     * @param {Object} param0 options, including key, text and meta.
     * @param {function(err)} callback Signal when the file is stored.
     */
    store({key, text, meta}, callback) {
        key = this.resolvePath(key)

        this.ensuredir(key, (err, path) => {
            if (err) {
                return callback(err)
            }

            fs.writeFile(key, text, {}, callback)
        })
    }

    /**
     * 
     * @param {string} key to load.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, callback) {
        key = this.resolvePath(key)

        this.ensuredir(key, (err, path) => {
            if (err) {
                return callback(err, null)
            }

            fs.readFile(key, {}, callback)
        })
    }

    /**
     * 
     * @param {string} key key to load.
     * @param {function(err, meta)} callback Load the meta object stored.
     */
    loadMeta(key, callback) {
        callback(new Error("Not implemented. Filesytem does not store meta data."))
    }

    /**
     * 
     * @param {Object} param0 Contains prefix, offset and limit.
     * @param {function(err)} err Callback if an error is encountered.
     * @param {function(key)} callback Called for every key listed.
     */
    list({prefix, offset, limit}, err, callback) {
        err(new Error("Not implemented."))
    }

}

module.exports = FileSystemStorage