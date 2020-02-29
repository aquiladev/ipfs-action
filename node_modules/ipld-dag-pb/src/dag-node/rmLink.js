'use strict'

const CID = require('cids')

const rmLink = (dagNode, nameOrCid) => {
  // It's a name
  if (typeof nameOrCid === 'string') {
    dagNode._links = dagNode._links.filter((link) => link.Name !== nameOrCid)
  } else if (Buffer.isBuffer(nameOrCid) || CID.isCID(nameOrCid)) {
    dagNode._links = dagNode._links.filter(
      (link) => !link.Hash.equals(nameOrCid))
  } else {
    throw new Error('second arg needs to be a name or CID')
  }
}

module.exports = rmLink
