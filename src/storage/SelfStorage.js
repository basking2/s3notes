/**
 * Client to the SelfServed.js middleware.
 */


const StorageInterface = require("./StorageInterface")

class SelfStorage extends StorageInterface {
    constructor({endpont}) {
        super()
        this.endpoint = endpoint
    }

    store({key, text, meta}, callback) {
    }

    /**
     * 
     * @param {string} key to load.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, callback) {
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

module.exports = SelfStorage