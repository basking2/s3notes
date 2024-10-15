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

    let msg = new ArrayBuffer(4 + meta.length + data.length);

    new Uint32Array(msg, 0, 1)[0] = meta.length;
    let msgArray = new Uint8Array(msg, 4);
    msgArray.set(meta);
    msgArray.set(data, meta.length);

    //console.info("Wrote meta len ", new Uint32Array(msg, 0, 1)[0], " which shoudl equal ", meta.length)

    return msg
}

/**
 * @param [meta, data] where meta is an object and data is a Uint8Array.
 */
function unpack(buffer) {
    if (typeof(buffer) === 'string') {
        buffer = new TextEncoder().encode(buffer)
    }

    let metaLen = new Uint32Array(buffer, 0, 1)[0]
    let meta
    if (metaLen === 0) {
        meta = {}
    } else {
        meta = JSON.parse(new TextDecoder('utf-8').decode(buffer.slice(4, metaLen+4)))
    }

    let data = buffer.slice(4+metaLen)

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