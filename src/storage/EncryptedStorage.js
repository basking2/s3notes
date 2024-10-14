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

        if (noencrypt) {
            const file = JSON.stringify({text: text})
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
            const file = JSON.stringify({ ciphertext, iv, encoding, meta, salt })
            this.storage.store({key, text: file, meta: {}}, callback)
        })
        .catch(callback)
    }

    loadAll(key, callback) {
        this.storage.load(key, true, (err, data, meta) => {
            if (err) {
                return callback(err, null)
            }

            try {
                callback(null, data, meta)
            } catch (e) {
                callback(e, data, meta)
            }
        })
    }

    load(key, loadMeta=true, callback) {
        const password = this.password
        this.loadAll(key, (err, txt) => {
            if (err) {
                return callback(err, txt)
            }

            var obj
            try {
                obj = JSON.parse(txt)
            } catch(e) {
                return callback(e, txt)
            }

            // Unencrypted document stored through the encryption scheme.
            const { text, ciphertext, iv, encoding, salt } = obj
            if (text) {
                return callback(null, text)
            }

            if (!ciphertext || !iv || !salt) {
                return callback(null, null)
            }

            this.doccrypt.decryptString({iv, password, salt, encoding: (encoding || 'hex'), ciphertext})
                .then(txt => callback(null, txt))
                .catch(e => callback(e, txt))
        })
    }
}

module.exports = EncryptedStorage