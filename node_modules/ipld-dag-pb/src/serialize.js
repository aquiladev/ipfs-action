'use strict'

const protons = require('protons')
const proto = protons(require('./dag.proto.js'))
const DAGLink = require('./dag-link/dagLink')

exports = module.exports

const toProtoBuf = (node) => {
  const pbn = {}

  if (node.Data && node.Data.length > 0) {
    pbn.Data = node.Data
  } else {
    // NOTE: this has to be null in order to match go-ipfs serialization
    // `null !== new Buffer(0)`
    pbn.Data = null
  }

  if (node.Links && node.Links.length > 0) {
    pbn.Links = node.Links
      .map((link) => ({
        Hash: link.Hash.buffer,
        Name: link.Name,
        Tsize: link.Tsize
      }))
  } else {
    pbn.Links = null
  }

  return pbn
}

/**
 * Serialize internal representation into a binary PB block.
 *
 * @param {Object} node - Internal representation of a PB block
 * @returns {Buffer} - The encoded binary representation
 */
const serializeDAGNode = (node) => {
  const data = node.Data
  const links = node.Links || []

  const serialized = proto.PBNode.encode(toProtoBuf({
    Data: data,
    Links: links
  }))

  return serialized
}

// Serialize an object where the `Links` might not be a `DAGLink` instance yet
const serializeDAGNodeLike = (data, links = []) => {
  const node = { Data: data }
  node.Links = links.map((link) => {
    return DAGLink.isDAGLink(link)
      ? link
      : DAGLink.util.createDagLinkFromB58EncodedHash(link)
  })
  return serializeDAGNode(node)
}

exports.serializeDAGNode = serializeDAGNode
exports.serializeDAGNodeLike = serializeDAGNodeLike
