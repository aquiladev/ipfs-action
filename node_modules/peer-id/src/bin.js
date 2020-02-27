#!/usr/local/bin/node

'use strict'

const PeerId = require('./index.js')

PeerId.create((err, id) => {
  if (err) {
    throw err
  }

  // eslint-disable-next-line
  console.log(JSON.stringify(id.toJSON(), null, 2))
})
