/**
 * Library code to store, optionally encrypting, settings.
 * 
 * This should cordinate with SettingsLoaderComponent.
 */

const { DocCrypt } = require('@basking2/docryptjs')

export const s3NotesConfig = "s3NotesConfig"

export default class SettingsStorer {
    constructor(password) {
        this.password = password
        this.doccrypt = DocCrypt.aes256cbc()
    }

    async store(settings) {
        const text = "false"
        const obj = await this.doccrypt.encryptString(this.password, this.salt, text, 'hex')
        localStorage.setItem(s3NotesConfig, JSON.stringify(obj))
    }

    async load() {
        const obj = localStorage.getItem(s3NotesConfig)
        obj.password = this.password
        return this.doccrypt
            .decryptString(obj)
            .then(str => JSON.parse(str))
    }
}