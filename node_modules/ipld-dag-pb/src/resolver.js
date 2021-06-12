'use strict'

const CID = require('cids')

const util = require('./util')

/**
 * Resolves a path within a PB block.
 *
 * If the path resolves half-way to a link, then the `remainderPath` is the part
 * after the link that can be used for further resolving
 *
 * Returns the value or a link and the partial missing path. This way the
 * IPLD Resolver can fetch the link and continue to resolve.
 *
 * @param {Uint8Array} binaryBlob - Binary representation of a PB block
 * @param {string} [path='/'] - Path that should be resolved
 */
exports.resolve = (binaryBlob, path = '/') => {
  let node = util.deserialize(binaryBlob)

  const parts = path.split('/').filter(Boolean)
  while (parts.length) {
    const key = parts.shift()
    // @ts-ignore
    if (node[key] === undefined) {
      // There might be a matching named link
      for (const link of node.Links) {
        if (link.Name === key) {
          return {
            value: link.Hash,
            remainderPath: parts.join('/')
          }
        }
      }

      // There wasn't even a matching named link
      throw new Error(`Object has no property '${key}'`)
    }

    // @ts-ignore
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
 * Return all available paths of a block.
 *
 * @generator
 * @param {Uint8Array} binaryBlob - Binary representation of a PB block
 * @yields {string} - A single path
 */
exports.tree = function * (binaryBlob) {
  const node = util.deserialize(binaryBlob)

  // There is always a `Data` and `Links` property
  yield 'Data'
  yield 'Links'
  for (let ii = 0; ii < node.Links.length; ii++) {
    yield `Links/${ii}`
    yield `Links/${ii}/Name`
    yield `Links/${ii}/Tsize`
    yield `Links/${ii}/Hash`
  }
}
