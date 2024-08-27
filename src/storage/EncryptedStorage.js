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

    store({key, text, meta}, callback) {
        const salt = DocCrypt.salt(32)

        Promise.all([
            this.doccrypt.encryptString(this.password, salt, text),
            this.doccrypt.encryptString(this.password, salt, JSON.stringify(meta))
        ])
        .catch(callback)
        .then(([obj, meta]) => {
            const ciphertext = obj['ciphertext']
            const iv = obj['iv']
            const encoding = obj['encoding']
            const file = JSON.stringify({ ciphertext, iv, encoding, meta, salt })
            this.storage.store({key, text: file, meta: {}}, callback)
        })
    }

    loadAll(key, callback) {
        this.storage.load(key, (err, data) => {
            if (err) {
                return callback(err, null)
            }

            try {
                callback(null, JSON.parse(data))
            } catch (e) {
                callback(e, null)
            }
        })
    }

    load(key, callback) {
        const password = this.password
        this.loadAll(key, (err, obj) => {
            if (err) {
                return callback(err, null)
            }

            const { ciphertext, iv, encoding, salt } = obj
            if (!ciphertext || !iv || !salt) {
                return callback(null, null)
            }

            this.doccrypt.decryptString({iv, password, salt, encoding: (encoding || 'hex'), ciphertext})
                .catch(e => callback(e, null))
                .then(txt => callback(null, txt))
        })
    }

    loadMeta(key, callback) {
        const password = this.password
        this.loadAll(key, (err, obj) => {
            if (err) {
                return callback(err, null)
            }

            const { salt } = obj
            const { ciphertext, iv, encoding } = obj['meta']
            if (!ciphertext || !iv || !salt) {
                return callback(new Error("Missing ciphertext, iv or salt."), null)
            }

            this.doccrypt.decryptString({iv, password, salt, encoding: (encoding || 'hex'), ciphertext})
                .catch(e => callback(e, null))
                .then(txt => callback(null, JSON.parse(txt)))
        })
    }

    list(args, err, callback) {
        return this.storage.list(args, err, callback)
    }
}

module.exports = EncryptedStorage