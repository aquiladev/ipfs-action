'use strict'

const resolver = require('./resolver')
const util = require('./util')
const DAGNodeClass = require('./dag-node/dagNode')
const DAGLinkClass = require('./dag-link/dagLink')

/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 * @typedef {import('./types').DAGNodeLike} DAGNodeLike
 * @typedef {import('./dag-node/dagNode')} DAGNode
 * @typedef {import('./dag-link/dagLink')} DAGLink
 */

/**
 * @type {import('./types').DAGNodeFormat}
 */
const format = {
  DAGNode: DAGNodeClass,
  DAGLink: DAGLinkClass,

  /**
   * Functions to fulfil IPLD Format interface
   * https://github.com/ipld/interface-ipld-format
   */
  resolver,
  util,
  codec: util.codec,
  defaultHashAlg: util.defaultHashAlg
}

module.exports = format
