'use strict'

const dagNodeUtil = require('./util')
const cloneLinks = dagNodeUtil.cloneLinks
const cloneData = dagNodeUtil.cloneData
const create = require('./create')
const CID = require('cids')

const rmLink = (dagNode, nameOrCid) => {
  const data = cloneData(dagNode)
  let links = cloneLinks(dagNode)

  if (typeof nameOrCid === 'string') {
    links = links.filter((link) => link.Name !== nameOrCid)
  } else if (Buffer.isBuffer(nameOrCid) || CID.isCID(nameOrCid)) {
    links = links.filter((link) => !link.Hash.equals(nameOrCid))
  } else {
    throw new Error('second arg needs to be a name or CID')
  }

  return create(data, links)
}

module.exports = rmLink
