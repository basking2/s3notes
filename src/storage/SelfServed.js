const fs = require('fs')

function middleware(opts={}) {
    const prefix = opts.prefix || "./storage"
    let fsroot = null

    console.info(`Setting up storage at ${prefix}.`)

    fs.mkdir(prefix, {recursive: true}, (err, path) => {
        if (err) {
            throw err
        }
    })

    fs.realpath(prefix, (err, cpath) => {
        if (err) {
            throw err
        }

        fsroot = cpath
    })


    return (req, resp, next) => {
        try {
            const file = `${fsroot}/${req.query['file']}`

            if (req.method === 'POST' || req.method === 'PUT') {

                fs.writeFile(file, req.body, (err) => {
                    if (err) {
                        console.error(e)
                        resp.code = 500
                        resp.send(`${e}`)
                        resp.end()
                    } else {
                        resp.code = 200
                        resp.send({status: "OK"})
                        resp.end()
                    }
                })


            } else {
                resp.sendFile(file, (err) => {
                    if (err) {
                        console.error(err)
                        resp.code = err.code
                        resp.send("Not found.")
                        resp.end()
                    }
                })
            }
        } catch (e) {
            console.error(e)
            resp.code = 500
            resp.send(`${e}`)
            resp.end()
        }
    }
}

module.exports = { middleware }