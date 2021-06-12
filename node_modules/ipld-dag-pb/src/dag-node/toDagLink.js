'use strict'

const DAGLink = require('../dag-link/dagLink')
const genCid = require('../genCid')

/**
 * toDAGLink converts a DAGNode to a DAGLink
 *
 * @typedef {import('../genCid').GenCIDOptions} GenCIDOptions
 *
 * @typedef {object} ToDagLinkExtraOptions
 * @property {string} [name]
 *
 * @typedef {GenCIDOptions & ToDagLinkExtraOptions} ToDagLinkOptions
 *
 * @param {import('./dagNode')} node
 * @param {ToDagLinkOptions} options
 */
const toDAGLink = async (node, options = {}) => {
  const buf = node.serialize()
  const nodeCid = await genCid.cid(buf, options)
  return new DAGLink(options.name || '', node.size, nodeCid)
}

module.exports = toDAGLink
