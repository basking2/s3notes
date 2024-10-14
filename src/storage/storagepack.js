/**
 * Pack and unpack a JSON object before a string of bytes.
 */

/**
 * 
 * @param {object} meta Object to be serialized.
 * @param {*} data Data to append to the serialized meta.
 * @returns Uint8Array of concatination of meta and data as a byte buffer.
 */
function pack(meta, data) {
    if (!meta) {
        meta = {}
    }
    meta = JSON.stringify(meta)
    meta = new TextEncoder("utf-8").encode(meta);

    if (typeof(data) == 'string') {
        data = new TextEncoder("utf-8").encode(data)
    }

    let msg = new Uint8Array(8 + meta.length + data.length)
    msg.set(Uint32Array.of(meta.length), 0)
    msg.set(meta, 4)
    msg.set(Uint32Array.of(data.length), 4 + meta.length)
    msg.set(data, 8 + meta.length)

    return msg
}

/**
 * @param [meta, data] where meta is an object and data is a Uint8Array.
 */
function unpack(buffer) {
    let metaLen = new Uint32Array(buffer.slice(0, 4))[0]
    let meta
    if (metaLen === 0) {
        meta = {}
    } else {
        meta = JSON.parse(new TextDecoder('utf-8').decode(buffer.slice(4, metaLen+4)))
    }

    let dataLen = new Uint32Array(buffer.slice(4+metaLen, 8+metaLen))[0]
    let data = buffer.slice(8+metaLen, 8+metaLen+dataLen)

    return [meta, data]
}

/**
 * 
 * @param {string} data 
 */
function metaLength(data) {
    return new Uint32Array(data.slice(0, 4))[0]
}

module.exports = {
    pack, unpack, metaLength
}