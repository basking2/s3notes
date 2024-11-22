const { DocCrypt } = require("@basking2/docryptjs")
const StorageInterface = require("./StorageInterface")

/**
 * Encrypt files, file names and all other options. Then pass that data on to another storage layer.
 * 
 * To protect contents the meta object is always stored as another file.
 */
class EncryptedStorage extends StorageInterface{
    constructor({password, storage}) {
        super()

        if (!storage) {
            throw new Error("storage option is required.")
        }

        this.password = password
        this.storage = storage
        this.doccrypt = DocCrypt.aes256cbc()
    }

    store({key, text, meta, noencrypt}, callback) {

        if (noencrypt || !this.password) {
            const file = JSON.stringify({text: text, meta: {text: JSON.stringify(meta)}})
            return this.storage.store({key, text: file, meta: {}}, callback)
        }
        
        const salt = DocCrypt.salt(32)

        if (!meta) {
            meta = {}
        }

        Promise.all([
            this.doccrypt.encryptString(this.password, salt, text),
            this.doccrypt.encryptString(this.password, salt, JSON.stringify(meta))
        ])
        .then(([obj, meta]) => {
            const ciphertext = obj['ciphertext']
            const iv = obj['iv']
            const encoding = obj['encoding']
            meta.salt = salt
            const file = JSON.stringify({ ciphertext, iv, encoding, meta, salt })
            this.storage.store({key, text: file, meta: {}}, callback)
        })
        .catch(callback)
    }

    loadAll(key, callback) {
        this.storage.load(key, true, (err, data, meta) => {
            if (err) {
                return callback(err, null, null)
            }

            try {
                callback(null, data, meta)
            } catch (e) {
                callback(e, data, meta)
            }
        })
    }

    load(key, loadMeta=true, callback) {
        this.loadAll(key, (err, txt, meta) => {
            if (err) {
                return callback(err, txt)
            }

            if (meta && meta.not_found) {
                return callback(err, '', meta)
            }

            if (txt instanceof Uint8Array) {
                txt = new TextDecoder().decode(txt)
            }

            let obj
            try {
                obj = JSON.parse(txt)
            } catch(e) {
                return callback(e, txt, {})
            }
            
            this.decryptObj(obj.meta || {})
                .catch(e => ({}))
                .then(meta => JSON.parse(meta))
                .then(meta => this.decryptObj(obj).then(txt => [meta, txt]))
                .then(([meta, txt]) => callback(null, txt, meta))
                .catch(e => callback(e))
        })
    }

    delete(key, callback) {
        return this.storage.delete(key, callback)
    }

    decryptObj(obj) {
        const { text, ciphertext, iv, encoding, salt } = obj
        if (text) {
            return Promise.resolve(text)
        }

        if (!ciphertext || !iv || !salt) {
            return Promise.reject(new Error("Missing cryptographic data."))
        }

        if (!this.password) {
            return Promise.reject(new Error("No password set."))
        }

        return this.doccrypt.decryptString({iv, password: this.password, salt, encoding: (encoding || 'hex'), ciphertext})
    }
}

module.exports = EncryptedStorage