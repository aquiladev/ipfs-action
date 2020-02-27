'use strict'

const DAGLink = require('./index')

function createDagLinkFromB58EncodedHash (link) {
  return new DAGLink(
    link.Name || link.name || '',
    link.Tsize || link.Size || link.size || 0,
    link.Hash || link.hash || link.multihash || link.cid
  )
}

exports = module.exports
exports.createDagLinkFromB58EncodedHash = createDagLinkFromB58EncodedHash
