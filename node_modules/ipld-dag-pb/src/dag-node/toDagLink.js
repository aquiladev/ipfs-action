'use strict'

const DAGLink = require('../dag-link/dagLink')
const genCid = require('../genCid')

/*
 * toDAGLink converts a DAGNode to a DAGLink
 */
const toDAGLink = async (node, options = {}) => {
  const nodeCid = await genCid.cid(node.serialize(), options)
  return new DAGLink(options.name || '', node.size, nodeCid)
}

module.exports = toDAGLink
