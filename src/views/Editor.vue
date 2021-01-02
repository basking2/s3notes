<template>
    <div
        v-on:keydown.ctrl.83.prevent="saveFile($event)"
        v-on:keydown.meta.83.prevent="saveFile($event)"
        >

        File: {{ file }}
        <v-checkbox v-model="encrypt" label="Encrypt" />
        <v-checkbox v-model="isPublic" label="Public" />

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
            contents: undefined
        }
    },
    created() {
    },
    methods: {
        saveFile(event) {
            if (this.file) {
                var s3config = this.$store.getters.s3config
                var opts = {
                    name: 'notes.txt',
                    bucket: s3config.bucket,
                    endpoint: s3config.endpoint,
                    secretKey: s3config.secretKey,
                    accessKey: s3config.accessKey,
                    body: "Test file.",
                    salt: "salt",
                    iv1: 'iv1',
                    iv2: 'iv2',
                    'cipher-name': 'cipher name'
                }

                daos3.write(opts, (err, data) => {
                    if (err) {
                        console.error("ERR", err)
                    } else {
                        console.info("Done", data)  
                    }
                })
            }
        },
        loadFile() {
            // if (this.file) {
            // }
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