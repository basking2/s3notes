/**
 * Client to the SelfServed.js middleware.
 */

import axios from 'axios'
import StorageInterface from './StorageInterface'

class SelfStorage extends StorageInterface {
    constructor({endpoint}) {
        super()
        this.endpoint = endpoint
    }

    store({key, text, meta}, callback) {
        axios({
            method: 'put',
            url: `${this.endpoint}?file=${key}`,
            data: text,
        })
        .then(v => callback(null))
        .catch(callback)
    }

    /**
     * 
     * @param {string} key to load.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, callback) {
        axios({
            method: 'get',
            url: `${this.endpoint}?file=${key}`,
        })
        .then(v => callback(null, v.data))
        .catch(callback)
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

export default SelfStorage