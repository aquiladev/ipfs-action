'use strict'

exports.DAGNode = require('./dag-node')
exports.DAGLink = require('./dag-link')

/*
 * Functions to fulfil IPLD Format interface
 * https://github.com/ipld/interface-ipld-format
 */
exports.resolver = require('./resolver')
exports.util = require('./util')
exports.codec = exports.util.codec
exports.defaultHashAlg = exports.util.defaultHashAlg
