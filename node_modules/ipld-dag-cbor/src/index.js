'use strict'

const util = require('./util.js')
const resolver = require('./resolver.js')

/**
 * @typedef {import('interface-ipld-format').Format<object>} ObjectFormat
 */

/**
 * @type {ObjectFormat}
 */
module.exports = {
  util,
  resolver,
  codec: util.codec,
  defaultHashAlg: util.defaultHashAlg
}
