const EncryptedStorage = require("./EncryptedStorage");
const FileSystemStorage = require("./FileSystemStorage");

test.skip('enc test', async () => {
    const fs = new FileSystemStorage({prefix: './testdata'})
    const enc = new EncryptedStorage({password: "pw", storage: fs})

    const text = "File text."
    const meta = { foo: "bar" }

    const v = await new Promise((resolve, reject) => {
        enc.store({key: "file1", text, meta}, (err) => {
            if (err) {
                return reject(err)
            }

            resolve()
        })
    })

    const text2 = await new Promise((resolve, reject) => {
        enc.load("file1", (err, txt) => {
            if (err) {
                return reject(err)
            }

            resolve(txt)
        })
    })

    const meta2 = await new Promise((resolve, reject) => {
        enc.loadMeta("file1", (err, txt) => {
            if (err) {
                return reject(err)
            }

            resolve(txt)
        })
    })

    expect(text2).not.toBeNull()
    expect(text2).toBe(text)
    expect(meta2).not.toBeNull()
    expect(meta2['foo']).toBe(meta['foo'])
});