'use strict'

const CID = require('cids')
const multicodec = require('multicodec')
const multihashing = require('multihashing-async')
const { multihash } = multihashing

const codec = multicodec.DAG_PB
const defaultHashAlg = multihash.names['sha2-256']

/**
 * @typedef {object} GenCIDOptions - Options to create the CID
 * @property {CID.CIDVersion} [cidVersion=1] - CID version number
 * @property {multihashing.multihash.HashCode} [hashAlg=multihash.names['sha2-256']] - Defaults to the defaultHashAlg of the format
 */

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {GenCIDOptions} [userOptions] - Options to create the CID
 */
const cid = async (binaryBlob, userOptions = {}) => {
  const options = {
    cidVersion: userOptions.cidVersion == null ? 1 : userOptions.cidVersion,
    hashAlg: userOptions.hashAlg == null ? defaultHashAlg : userOptions.hashAlg
  }

  const hashName = multihash.codes[options.hashAlg]
  const hash = await multihashing(binaryBlob, hashName)
  const codecName = multicodec.getNameFromCode(codec)
  const cid = new CID(options.cidVersion, codecName, hash)

  return cid
}

module.exports = {
  codec,
  defaultHashAlg,
  cid
}
