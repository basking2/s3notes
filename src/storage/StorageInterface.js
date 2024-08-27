
const http = require("node:http")


class StorageInterface {
    constructor(params={}) {
    }

    /**
     * 
     * @param {Object} param0 options, including key, text and meta.
     * @param {function(err)} callback Signal when the file is stored.
     */
    store({key, text, meta}, callback) {
        callback(new Error("Not implemented."))
    }

    /**
     * 
     * @param {string} key to load.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, callback) {
        callback(new Error("Not implemented."))
    }

    /**
     * 
     * @param {string} key key to load.
     * @param {function(err, meta)} callback Load the meta object stored.
     */
    loadMeta(key, callback) {
        callback(new Error("Not implemented."))
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

module.exports = StorageInterface