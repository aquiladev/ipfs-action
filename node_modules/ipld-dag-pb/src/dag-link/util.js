'use strict'

const DAGLink = require('./dagLink')

/**
 * @param {*} link
 */
function createDagLinkFromB58EncodedHash (link) {
  return new DAGLink(
    link.Name || link.name || '',
    link.Tsize || link.Size || link.size || 0,
    link.Hash || link.hash || link.multihash || link.cid
  )
}

module.exports = {
  createDagLinkFromB58EncodedHash
}
