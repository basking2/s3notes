/**
 * Client to the SelfServed.js middleware.
 */

import axios from 'axios'
import StorageInterface from './StorageInterface'
import storagepack from './storagepack'

class SelfStorage extends StorageInterface {
    constructor({endpoint}) {
        super()
        this.endpoint = endpoint
    }

    buildurl(key) {
        return `${this.endpoint}/${key}`
    }

    store({key, text, meta}, callback) {
        text = storagepack.pack(meta, text)
        axios({
            method: 'put',
            url: this.buildurl(key),
            data: text,
        })
        .then(v => callback(null))
        .catch(callback)
    }

    /**
     * 
     * @param {string} key to load.
     * @param {boolean} loadMeta True, load meta, false it is optional.
     * @param {function(err, text, meta)} callback Called with the text
     * of the file and an optional meta object that may have information
     * about the loaded file, such as the type it was stored under.
     */
    load(key, loadMeta=true, callback) {
        axios({
            method: 'get',
            url: this.buildurl(key),
            transformResponse: (res) => res,
        })
        .then(v => {
            let [ meta, data ] = storagepack.unpack(v.data)
            return callback(null, data, meta)
        })
        .catch(e => {
            if (e.status === 404) {
                return callback(null, '', {not_found: true})
            }

            callback(e)
        })
    }

    delete(key, callback) {
        axios({
            method: 'delete',
            url: this.buildurl(key),
            transformResponse: (res) => res,
        })
        .then(v => callback())
        .catch(callback)
    }
}

export default SelfStorage