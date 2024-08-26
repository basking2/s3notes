import EncryptedStorage from "./EncryptedStorage"
import S3Storage from "./S3Storage"
import SelfStorage from "./SelfStorage"
import StorageInterface from "./StorageInterface"

/**
 * Build storage from a settings object. See ./settings.
 * @param {object} settings The settings.
 * @param {string} password If given, the configured storage object will be wrapped in an EncryptedStorage object.
 */
export function fromSettings(settings) {
    let storage
    if (!settings) {
        storage = new StorageInterface()
    }

    if ('settings' in settings) {
        settings = settings.settings
    }

    if (settings.type === 's3') {
        let opts = {
            bucket: settings.bucket,
            endpoint: settings.endpoint,
            accessKeyId: settings.accessKeyId,
            secretAccessKey: settings.secretAccessKey,
        }

        if ('s3ForcePathStyle' in settings) {
            opts.s3ForcePathStyle = settings.s3ForcePathStyle
        } else {
            opts.s3ForcePathStyle = false
        }

        if ('region' in settings) {
            opts.region = settings.region
        } else {
            opts.region = "us-east-1"
        }

        storage = new S3Storage(opts)

        if ('prefix' in settings) {
            storage.prefix = settings.prefix
        } else {
            storage.prefix = "/data"
        }

    } else if (settings.type === 'self') {
        storage = new SelfStorage({endpoint: settings.endpoint})
    } else {
        storage = new StorageInterface()
    }

    // Always wrap in our encryption engine so the documents are stored with its meta data.
    storage = new EncryptedStorage({storage, password: settings.documentPassword})

    return storage
}

const obj = { fromSettings }
export default obj