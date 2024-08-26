
class StorageInterface {

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
     * @param {boolean} fetchMeta If true, the meta value is loaded (default). If false, it may be skipped.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     * 
     * The meta object, if it contains not_found:true, indicates the storage
     * layer could not find the requested key.
     */
    load(key, fetchMeta=true, callback) {
        callback(new Error("Not implemented."))
    }

    delete(key, callback) {
        callback(new Error("Not implemented."))
    }
}

module.exports = StorageInterface