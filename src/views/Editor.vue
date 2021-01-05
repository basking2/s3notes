<template>
    <!-- S (key 83) is save. -->
    <!-- O (key 79) is open. -->
    <div
        v-on:keydown.ctrl.83.prevent="saveFile($event)"
        v-on:keydown.meta.83.prevent="saveFile($event)"

        v-on:keydown.ctrl.79.prevent="displayFile($event)"
        v-on:keydown.meta.79.prevent="displayFile($event)"
        >

        <v-card flat class="ma-1 text-left">
            <v-btn class="ma-1" v-on:click="saveFile($event)">Save</v-btn>
            <v-btn class="ma-1" v-on:click="$router.push(to=`/view/${file}`)">View</v-btn>
        </v-card>

        <v-card flat class="d-flex">
            <!-- <router-link class="mt-auto mb-auto" :to="`/view/${file}`" >{{file}}.</router-link> -->
            <v-checkbox v-model="encrypt" label="Encrypt" />
            <v-checkbox v-model="isPublic" label="Public" />
            <v-spacer />
            <v-text-field v-model="content_type" label="Content Type" />
        </v-card>

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
        displayFile(event) {
            this.$router.push(`/view/${this.file}`)
        },
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
                            utilEvent.dispatchAlert(this, err.message)
                        } else {
                            utilEvent.dispatchAlert(this, 'success', `File ${this.file} saved.`)
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

                    if (this.file.toLowerCase().endsWith(".html")) {
                        this.content_type = "text/html"
                        this.editor.session.setMode("ace/mode/html");
                    } else if (this.file.toLowerCase().endsWith(".adoc") || this.file.toLowerCase().endsWith(".asciidoc")) {
                        this.content_type = "text/plain"
                        this.editor.session.setMode("ace/mode/asciidoc");
                    } else if (this.file.toLowerCase().endsWith(".md")) {
                        this.content_type = "text/plain"
                        this.editor.session.setMode("ace/mode/markdown");
                    } else if (this.file.toLowerCase().endsWith(".json")) {
                        this.content_type = "text/json"
                        // editor.session.setMode("ace/mode/javascript");
                        this.editor.session.setMode("ace/mode/json");
                    } else {
                        this.content_type = "text/plain"
                        this.editor.session.setMode("ace/mode/plain_text");
                    }

                    if (data && 'content_type' in data) {
                        this.content_type = data.content_type
                    }

                    if (data) {
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

        // Dark theme.
        // editor.setTheme("ace/theme/monokai");

        editor.session.setMode("ace/mode/javascript");
        editor.focus()
        this.editor = editor

        var s3config = this.$store.getters.s3config 

        this.loadFile()
    }
}
</script>

<style scoped>
    #editor { 
        position: absolute;
        top: 10em;
        right: 0;
        bottom: 0;
        left: 0;
    }
</style>