
import sp from './storagepack'

import { TextEncoder, TextDecoder } from 'util';
import fs from 'fs'

Object.assign(global, { TextDecoder, TextEncoder });

test('test storage packing', () => {
    let meta1 = { a: 1, b: "This is B."}
    let data1 = "This is a data string."

    let enc = sp.pack(meta1, data1)

    let [ meta2, data2 ] = sp.unpack(enc)

    expect(data2).toBeInstanceOf(Uint8Array)
    data2 = new TextDecoder('utf-8').decode(data2)

    expect(meta2).toBeInstanceOf(Object)
    expect(meta2.a).toEqual(meta1.a)
    expect(meta2.b).toEqual(meta1.b)

    expect(typeof(data2)).toBe('string')
    expect(data2).toEqual(data1)
    expect(data2).toEqual(data1)
});

test('test storage packing when string', () => {
    let meta1 = { a: 1, b: "This is B."}
    let data1 = "This is a data string."

    let enc = sp.pack(meta1, data1)

    enc = new TextDecoder().decode(enc)

    let [ meta2, data2 ] = sp.unpack(enc)

    data2 = new TextDecoder('utf-8').decode(data2)

    expect(meta2).toBeInstanceOf(Object)
    expect(meta2.a).toEqual(meta1.a)
    expect(meta2.b).toEqual(meta1.b)

    expect(typeof(data2)).toBe('string')
    expect(data2).toEqual(data1)
    expect(data2).toEqual(data1)
});

test('aaatest storage file', () => {
    let filecontents = fs.readFileSync('./storage/x.adoc')
    console.info(filecontents)

    let [meta, data] = sp.unpack(filecontents)

    data = new TextDecoder().decode(data)

    console.info(meta, data)
});
