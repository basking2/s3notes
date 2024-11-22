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
            let file
            if (req.query['file']) {
                file = `${fsroot}/${req.query['file']}`
            } else {
                file = `${fsroot}${req.path}`
            }

            if (req.method === 'POST' || req.method === 'PUT') {

                fs.writeFile(file, req.body, (err) => {
                    if (err) {
                        console.error(err)
                        resp.status(500)
                        resp.send(`${err}`)
                        resp.end()
                    } else {
                        resp.code = 200
                        resp.send({status: "OK"})
                        resp.end()
                    }
                })
            } else if (req.method === 'DELETE') {
                fs.rm(file, (err) => {
                    if (err) {
                        console.error(err)
                        resp.status(500)
                        resp.send(`${err}`)
                        resp.end()
                    } else {
                        resp.status(200)
                        resp.send({status: "OK"})
                        resp.end()
                    }
                })
            } else {
                resp.sendFile(file, (err) => {
                    if (err) {
                        console.error(err)
                        resp.status(err.status)
                        resp.send("Not found.")
                        resp.end()
                    }
                })
            }
        } catch (e) {
            console.error(e)
            resp.status(500)
            resp.send(`${e}`)
            resp.end()
        }
    }
}

module.exports = { middleware }