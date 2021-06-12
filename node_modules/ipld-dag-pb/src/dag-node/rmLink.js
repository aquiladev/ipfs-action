'use strict'

const CID = require('cids')
const uint8ArrayEquals = require('uint8arrays/equals')

/**
 * @typedef {import('../dag-link/dagLink')} DAGLink
 */

/**
 *
 * @param {import('./dagNode')} dagNode
 * @param {string | CID | Uint8Array | DAGLink} nameOrCid
 */
const rmLink = (dagNode, nameOrCid) => {
  let predicate = null

  // It's a name
  if (typeof nameOrCid === 'string') {
    predicate = (/** @type {DAGLink} */ link) => link.Name === nameOrCid
  } else if (nameOrCid instanceof Uint8Array) {
    predicate = (/** @type {DAGLink} */ link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid)
  } else if (CID.isCID(nameOrCid)) {
    predicate = (/** @type {DAGLink} */ link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid.bytes)
  }

  if (predicate) {
    const links = dagNode.Links
    let index = 0
    while (index < links.length) {
      const link = links[index]
      if (predicate(link)) {
        links.splice(index, 1)
      } else {
        index++
      }
    }
  } else {
    throw new Error('second arg needs to be a name or CID')
  }
}

module.exports = rmLink
