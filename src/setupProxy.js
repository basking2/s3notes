const SelfServed = require('./storage/SelfServed')
const express = require('express')

module.exports = function(app) {
  app.use(
    `${process.env['PUBLIC_URL']}/ping`,
    (req, resp, next) => {
      resp.type('text/plain')
      resp.send('pong')
    }
  )

  app.use(
    `${process.env['PUBLIC_URL']}/storage`,
    express.raw({type: '*/*', limit: '2GB'}),
    SelfServed.middleware()
  )

};
