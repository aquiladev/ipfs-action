'use strict'

const CID = require('cids')
const util = require('./util')

/**
 * Resolves a path within a CBOR block.
 *
 * Returns the value or a link and the partial mising path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Uint8Array} binaryBlob - Binary representation of a CBOR block
 * @param {string} [path='/'] - Path that should be resolved
 */
exports.resolve = (binaryBlob, path = '') => {
  let node = util.deserialize(binaryBlob)

  const parts = path.split('/').filter(Boolean)
  while (parts.length) {
    const key = parts.shift()
    if (!key || !(key in node)) {
      throw new Error(`Object has no property '${key}'`)
    }

    node = node[key]
    if (CID.isCID(node)) {
      return {
        value: node,
        remainderPath: parts.join('/')
      }
    }
  }

  return {
    value: node,
    remainderPath: ''
  }
}

/**
 * @param {any} node
 * @param {string} [path]
 * @returns {Generator<string, void, undefined>}
 */
const traverse = function * (node, path) {
  // Traverse only objects and arrays
  if (node instanceof Uint8Array || CID.isCID(node) || typeof node === 'string' || node === null) {
    return
  }

  for (const item of Object.keys(node)) {
    const nextpath = path === undefined ? item : path + '/' + item
    yield nextpath
    yield * traverse(node[item], nextpath)
  }

  // to stop eslint and tsc fighting
  return undefined
}

/**
 * Return all available paths of a block.
 *
 * @generator
 * @param {Uint8Array} binaryBlob - Binary representation of a CBOR block
 * @yields {string} - A single path
 */
exports.tree = function * (binaryBlob) {
  const node = util.deserialize(binaryBlob)

  yield * traverse(node)
}
