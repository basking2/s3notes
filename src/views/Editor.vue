<template>
    <div
        v-on:keydown.ctrl.83.prevent="saveFile($event)"
        v-on:keydown.meta.83.prevent="saveFile($event)"
        >

        File: {{ file }}
        <v-card flat class="d-flex">
            <v-checkbox v-model="encrypt" label="Encrypt" />
            <v-checkbox v-model="isPublic" label="Public" />
        </v-card>
        <v-text-field v-model="content_type" label="Content Type" />

        <div id="editor"></div>
    </div>
</template>

<script>

/* eslint-disable no-unused-vars */
const utilEvent = require('../util/event')

const ace = require('ace-builds/src-min-noconflict/ace')

// This needs only be required, not bound to a variable.
require('ace-builds/webpack-resolver')

const daos3 = require('../dao/s3')
const encryption = require('../encryption')
const util = require('util')

export default {
    props: {
        file: String
    },
    data() {
        return {
            editor: undefined,
            encrypt: true,
            isPublic: false,
            props: undefined,
            contents: undefined,
            content_type: 'text/plain'
        }
    },
    created() {
    },
    methods: {
        saveFile(event) {
            if (this.file) {

                var body = this.editor.session.getValue()

                var promise

                if (this.encrypt) {
                    promise = util.promisify(encryption.encrypt)(this.$store.getters.docpass, body)
                }
                else {
                    promise = Promise.resolve({ 'body': body })
                }

                promise.then(props => {
                    var s3config = this.$store.getters.s3config
                    console.info(props)
                    var opts = {
                        name: this.file,
                        content_type: this.content_type,
                        ispublic: !!this.isPublic,
                        bucket: s3config.bucket,
                        endpoint: s3config.endpoint,
                        secretKey: s3config.secretKey,
                        accessKey: s3config.accessKey,
                        body: props.body,
                        salt: props.salt,
                        iv1: props.iv1,
                        iv2: props.iv2,
                        key: props.key,
                        cipher: props.cipher,
                    }

                    daos3.write(opts, (err, data) => {
                        if (err) {
                            console.error("ERR", err)
                        } else {
                            console.info("Done", data)  
                        }
                    })
                })
                
            }
        },
        loadFile() {
            if (this.file) {
                var s3config = this.$store.getters.s3config
                var opts = {
                    name: this.file,
                    bucket: s3config.bucket,
                    endpoint: s3config.endpoint,
                    secretKey: s3config.secretKey,
                    accessKey: s3config.accessKey,
                }

                daos3.read(opts, (err, data) => {
                    this.content_type = data.content_type
                    if (err) {
                        console.error("ERR", err)
                    } else {
                        if ('ispublic' in data) {
                            this.isPublic = true
                        } else {
                            this.isPublic = false
                        }

                        if ('cipher' in data) {
                            this.encrypt = true
                            encryption.decrypt(this.$store.getters.docpass, data.salt, data.iv1, data.iv2, data.key, data.body, (err, data) => {
                                this.editor.session.setValue(data)
                            })
                        } else {
                            this.encrypt = false
                            this.editor.session.setValue(data.body)
                        }
                    }
                })
            }
        }
    },
    mounted() {
        
        var editor = ace.edit("editor");
        editor.setTheme("ace/theme/monokai");
        editor.session.setMode("ace/mode/javascript");
        this.editor = editor

        var s3config = this.$store.getters.s3config 

        if (this.file) {
            this.loadFile()
        }
    }
}
</script>

<style scoped>
    #editor { 
        position: absolute;
        top: 20em;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>