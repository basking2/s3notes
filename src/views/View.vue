<template>
    <div v-on:click.prevent="handleClicks($event)">
        View a document.
        Use S3: {{useS3}}
        <a href="http://www.google.com">Demo link</a>
        {{file}}

        <div v-if="html" v-html="html"></div>
        <code v-if="rawText">{{rawText}}</code>
        <div v-if="adoc">
            {{adoc}}
        </div>
        <div v-if="markdown">
            {{markdown}}
        </div>
    </div>
</template>

<script>
const http = require('http')
const encryption = require('../encryption')
const utilEvent = require('../util/event')

export default {
    props: {
        file: String,
        useS3: Boolean,
    },
    data() {
        return {
            html: undefined,
            adoc: undefined,
            markdown: undefined,
            rawText: undefined,
        }
    },
    mounted() {
        this.getDoc()
    },
    methods: {
        clearContent() {
            this.html = undefined
            this.adoc = undefined
            this.markdown = undefined
            this.rawText = undefined
        },
        defaultRender(txt) {
            this.clearContent()
            this.rawText = txt
        },
        renderHtml(html) {
            this.clearContent()
            this.html = html
        },
        renderAsciiDoc(adoc) {
            this.clearContent()
            this.adoc = adoc
        },
        renderMarkdown(md) {
            this.clearContent()
            this.markdown = md
        },
        getDoc() {
            var endpoint = this.$store.getters.s3config.endpoint
            var bucket = this.$store.getters.s3config.bucket
            var url = new URL(`${endpoint}/${bucket}/data/${this.file}`)

            var req = http.request(
                {
                   method: 'GET',
                   protocol: url.protocol,
                   host: url.hostname,
                   port: url.port,
                   path: url.pathname,
                },
                res => {

                    var handler = this.defaultRender
                    if (!res.headers['content-type']) {
                        handler = this.defaultRender
                    } else if (res.headers['content-type'].toLowerCase().startsWith('text/html')) {
                        handler = this.renderHtml
                    } else if (this.file.toLowerCase().endsWith('.adoc') || this.file.toLowerCase().endsWith('.asciidoc')) {
                        handler = this.renderAsciiDoc
                    } else if (this.file.toLowerCase().endsWith('.md')) {
                        handler = this.renderMarkdown
                    } else {
                        handler = this.defaultRender
                    }

                    var data = ''
                    res.on('data', chunk => data += chunk)
                    res.on('end', () => {
                        var cipher = res.headers['x-amz-meta-cipher']
                        if (cipher) {
                            var salt = res.headers['x-amz-meta-salt']
                            var iv1 = res.headers['x-amz-meta-iv1']
                            var iv2 = res.headers['x-amz-meta-iv2']
                            var key = res.headers['x-amz-meta-key']
                            var pass = this.$store.getters.docpass
                            encryption.decrypt(pass, salt, iv1, iv2, key, data, (err, data) => {
                                if (err) {
                                    utilEvent.dispatchAlert(this, err.message)
                                } else {
                                    handler(data)
                                }
                            })
                        } else {
                            handler(data)
                        }
                    })
                    res.on('error', (err) => utilEvent.dispatchAlert(this, err.message))
            })

            req.end()
        },
        handleClicks(event){
            if (event.target)
                console.info(event.target.href)
        }
    }
}
</script>