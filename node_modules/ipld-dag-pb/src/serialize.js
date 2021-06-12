'use strict'

const protobuf = require('protobufjs/minimal')
const {
  PBLink
} = require('./dag')

const {
  createDagLinkFromB58EncodedHash
} = require('./dag-link/util')

/**
 * @typedef {import('./dag-link/dagLink')} DAGLink
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 * @typedef {import('./types').SerializableDAGNode} SerializableDAGNode
 * @typedef {import('cids')} CID
 */

/**
 * @param { { Data?: Uint8Array, Links: (DAGLink | DAGLinkLike)[] }} node
 * @returns {SerializableDAGNode}
 */
const toProtoBuf = (node) => {
  const pbn = {}

  if (node.Data && node.Data.byteLength > 0) {
    pbn.Data = node.Data
  } else {
    // NOTE: this has to be null in order to match go-ipfs serialization
    // `null !== new Uint8Array(0)`
    pbn.Data = null
  }

  if (node.Links && node.Links.length > 0) {
    pbn.Links = node.Links
      .map((link) => ({
        Hash: link.Hash.bytes,
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
 * @param {import('./dag-node/dagNode')} node - Internal representation of a PB block
 */
const serializeDAGNode = (node) => {
  return encode(toProtoBuf(node))
}

/**
 * Serialize an object where the `Links` might not be a `DAGLink` instance yet
 *
 * @param {Uint8Array} [data]
 * @param {(DAGLink | string | DAGLinkLike)[]} [links]
 */
const serializeDAGNodeLike = (data, links = []) => {
  const node = {
    Data: data,
    Links: links.map((link) => {
      return createDagLinkFromB58EncodedHash(link)
    })
  }

  return encode(toProtoBuf(node))
}

module.exports = {
  serializeDAGNode,
  serializeDAGNodeLike
}

/**
 * The fields in PBNode are the wrong way round - `id: 2` comes before
 * `id: 1`. protobufjs writes them out in id order but go-IPFS does not so
 * we have to use the protobuf.Writer interface directly to get the same
 * serialized form as go-IPFS
 *
 * @param {SerializableDAGNode} pbf
 */
function encode (pbf) {
  const writer = protobuf.Writer.create()

  if (pbf.Links != null) {
    for (let i = 0; i < pbf.Links.length; i++) {
      PBLink.encode(pbf.Links[i], writer.uint32(18).fork()).ldelim()
    }
  }

  if (pbf.Data != null) {
    writer.uint32(10).bytes(pbf.Data)
  }

  return writer.finish()
}
