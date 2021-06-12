'use strict'

const {
  PBNode
} = require('./dag')
const DAGLink = require('./dag-link/dagLink')
const DAGNode = require('./dag-node/dagNode')
const { serializeDAGNode, serializeDAGNodeLike } = require('./serialize')
const genCid = require('./genCid')

/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 */

/**
 * Calculate the CID of the binary blob
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {import('./genCid').GenCIDOptions} [userOptions] - Options to create the CID
 */
const cid = (binaryBlob, userOptions) => {
  return genCid.cid(binaryBlob, userOptions)
}

/**
 * Serialize internal representation into a binary PB block
 *
 * @param {DAGNode | { Data?: Uint8Array, Links?: (DAGLink | DAGLinkLike)[]}} node
 */
const serialize = (node) => {
  if (node instanceof DAGNode) {
    return serializeDAGNode(node)
  } else {
    return serializeDAGNodeLike(node.Data, node.Links)
  }
}

/**
 * Deserialize PB block into the internal representation.
 *
 * @param {Uint8Array} buffer - Binary representation of a PB block
 */
const deserialize = (buffer) => {
  const message = PBNode.decode(buffer)
  const pbn = PBNode.toObject(message, {
    defaults: false,
    arrays: true,
    longs: Number,
    objects: false
  })

  /** @type {DAGLink[]} */
  const links = pbn.Links.map((/** @type {DAGLinkLike} */ link) => {
    // @ts-ignore
    return new DAGLink(link.Name, link.Tsize, link.Hash)
  })

  const data = pbn.Data == null ? new Uint8Array(0) : pbn.Data

  return new DAGNode(data, links, buffer.byteLength)
}

module.exports = {
  codec: genCid.codec,
  defaultHashAlg: genCid.defaultHashAlg,
  serialize,
  deserialize,
  cid
}
