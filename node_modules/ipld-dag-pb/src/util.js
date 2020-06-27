'use strict'

const { Buffer } = require('buffer')
const protons = require('protons')
const proto = protons(require('./dag.proto'))
const DAGLink = require('./dag-link/dagLink')
const DAGNode = require('./dag-node/dagNode')
const { serializeDAGNodeLike } = require('./serialize')
const genCid = require('./genCid')

exports = module.exports

exports.codec = genCid.codec
exports.defaultHashAlg = genCid.defaultHashAlg

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Object} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {number} [userOptions.cidVersion=1] - CID version number
 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
 * @returns {Promise.<CID>}
 */
const cid = (binaryBlob, userOptions) => {
  return genCid.cid(binaryBlob, userOptions)
}

/**
 * Serialize internal representation into a binary PB block.
 *
 * @param {Object} node - Internal representation of a CBOR block
 * @returns {Buffer} - The encoded binary representation
 */
const serialize = (node) => {
  if (DAGNode.isDAGNode(node)) {
    return node.serialize()
  } else {
    return serializeDAGNodeLike(node.Data, node.Links)
  }
}

/**
 * Deserialize PB block into the internal representation.
 *
 * @param {Buffer} buffer - Binary representation of a PB block
 * @returns {Object} - An object that conforms to the IPLD Data Model
 */
const deserialize = (buffer) => {
  const pbn = proto.PBNode.decode(buffer)

  const links = pbn.Links.map((link) => {
    return new DAGLink(link.Name, link.Tsize, link.Hash)
  })

  const data = pbn.Data == null ? Buffer.alloc(0) : pbn.Data

  return new DAGNode(data, links, buffer.length)
}

exports.serialize = serialize
exports.deserialize = deserialize
exports.cid = cid
