'use strict'

// @ts-ignore TODO: switch to cborg
const cbor = require('borc')
const multicodec = require('multicodec')
const multihashing = require('multihashing-async')
const { multihash } = multihashing
const CID = require('cids')
// @ts-ignore
const isCircular = require('is-circular')
const uint8ArrayConcat = require('uint8arrays/concat')
const uint8ArrayFromString = require('uint8arrays/from-string')

/**
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('multihashing-async').multihash.HashCode} HashCode
 */

// https://github.com/ipfs/go-ipfs/issues/3570#issuecomment-273931692
const CID_CBOR_TAG = 42

/**
 * @param {CID | string} cid
 */
function tagCID (cid) {
  let buf

  if (typeof cid === 'string') {
    buf = new CID(cid).bytes
  } else if (CID.isCID(cid)) {
    buf = cid.bytes
  } else {
    throw new Error('Could not tag CID - was not string or CID')
  }

  return new cbor.Tagged(CID_CBOR_TAG, uint8ArrayConcat([
    uint8ArrayFromString('00', 'base16'), // thanks jdag
    buf
  ], 1 + buf.length))
}

/**
 * @param {any} dagNode
 */
function replaceCIDbyTAG (dagNode) {
  let circular
  try {
    circular = isCircular(dagNode)
  } catch (e) {
    circular = false
  }
  if (circular) {
    throw new Error('The object passed has circular references')
  }

  /**
   * @param {any} obj
   * @returns {any}
   */
  function transform (obj) {
    if (!obj || obj instanceof Uint8Array || typeof obj === 'string') {
      return obj
    }

    if (Array.isArray(obj)) {
      return obj.map(transform)
    }

    if (CID.isCID(obj)) {
      return tagCID(obj)
    }

    const keys = Object.keys(obj)

    if (keys.length > 0) {
      // Recursive transform
      /** @type {Record<string, any>} */
      const out = {}
      keys.forEach((key) => {
        if (typeof obj[key] === 'object') {
          out[key] = transform(obj[key])
        } else {
          out[key] = obj[key]
        }
      })
      return out
    } else {
      return obj
    }
  }

  return transform(dagNode)
}

const codec = multicodec.DAG_CBOR
const defaultHashAlg = multihash.names['sha2-256']

const defaultTags = {
  /**
   * @param {Uint8Array} val
   */
  [CID_CBOR_TAG]: (val) => {
    // remove that 0
    val = val.slice(1)
    return new CID(val)
  }
}
const defaultSize = 64 * 1024 // current decoder heap size, 64 Kb
let currentSize = defaultSize
const defaultMaxSize = 64 * 1024 * 1024 // max heap size when auto-growing, 64 Mb
let maxSize = defaultMaxSize
/** @type {cbor.Decoder} */
let decoder

/**
 * Configure the underlying CBOR decoder.
 *
 * @param {Object} [options] - The options the decoder takes. The decoder will reset to the defaul values if no options are given.
 * @param {number} [options.size=65536] - The current heap size used in CBOR parsing, this may grow automatically as larger blocks are encountered up to `maxSize`
 * @param {number} [options.maxSize=67108864] - The maximum size the CBOR parsing heap is allowed to grow to before `dagCBOR.util.deserialize()` returns an error
 * @param {Object} [options.tags] - An object whose keys are CBOR tag numbers and values are transform functions that accept a `value` and return a decoded representation of that `value`
 */
function configureDecoder (options) {
  let tags = defaultTags

  if (options) {
    if (typeof options.size === 'number') {
      currentSize = options.size
    }
    if (typeof options.maxSize === 'number') {
      maxSize = options.maxSize
    }
    if (options.tags) {
      tags = Object.assign({}, defaultTags, options && options.tags)
    }
  } else {
    // no options, reset to defaults
    currentSize = defaultSize
    maxSize = defaultMaxSize
  }

  const decoderOptions = {
    tags,
    size: currentSize
  }

  decoder = new cbor.Decoder(decoderOptions)
  // borc edits opts.size in-place so we can capture _actual_ size
  currentSize = decoderOptions.size
}

configureDecoder() // Setup default cbor.Decoder

/**
 * Serialize internal representation into a binary CBOR block.
 *
 * @param {Object} node - Internal representation of a CBOR block
 * @returns {Uint8Array} - The encoded binary representation
 */
function serialize (node) {
  const nodeTagged = replaceCIDbyTAG(node)
  const serialized = cbor.encode(nodeTagged)

  return serialized
}

/**
 * Deserialize CBOR block into the internal representation.
 *
 * @param {Uint8Array} data - Binary representation of a CBOR block
 * @returns {any} - An object that conforms to the IPLD Data Model
 */
function deserialize (data) {
  if (data.length > currentSize && data.length <= maxSize) {
    configureDecoder({ size: data.length })
  }

  if (data.length > currentSize) {
    throw new Error('Data is too large to deserialize with current decoder')
  }

  // borc will decode back-to-back objects into an implicit top-level array, we
  // strictly want to only see a single explicit top-level object
  const all = decoder.decodeAll(data)
  if (all.length !== 1) {
    throw new Error('Extraneous CBOR data found beyond initial top-level object')
  }

  return all[0]
}

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {CIDVersion} [userOptions.cidVersion=1] - CID version number
 * @param {HashCode} [userOptions.hashAlg=multihash.names['sha2-256']] - Defaults to the defaultHashAlg of the format
 */
async function cid (binaryBlob, userOptions = {}) {
  const options = {
    cidVersion: userOptions.cidVersion == null ? 1 : userOptions.cidVersion,
    hashAlg: userOptions.hashAlg == null ? module.exports.defaultHashAlg : userOptions.hashAlg
  }

  const hashName = multihash.codes[options.hashAlg]
  const hash = await multihashing(binaryBlob, hashName)
  const codecName = multicodec.getNameFromCode(module.exports.codec)
  const cid = new CID(options.cidVersion, codecName, hash)

  return cid
}

module.exports = {
  codec,
  defaultHashAlg,
  configureDecoder,
  serialize,
  deserialize,
  cid
}
