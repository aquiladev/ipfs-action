'use strict'

const CID = require('cids')
const multicodec = require('multicodec')
const multihashing = require('multihashing-async')

exports = module.exports

exports.codec = multicodec.DAG_PB
exports.defaultHashAlg = multicodec.SHA2_256

/**
 * Calculate the CID of the binary blob.
 *
 * @param {Object} binaryBlob - Encoded IPLD Node
 * @param {Object} [userOptions] - Options to create the CID
 * @param {number} [userOptions.cidVersion=1] - CID version number
 * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
 * @returns {Promise.<CID>}
 */
const cid = async (binaryBlob, userOptions) => {
  const defaultOptions = { cidVersion: 1, hashAlg: exports.defaultHashAlg }
  const options = Object.assign(defaultOptions, userOptions)

  const multihash = await multihashing(binaryBlob, options.hashAlg)
  const codecName = multicodec.print[exports.codec]
  const cid = new CID(options.cidVersion, codecName, multihash)

  return cid
}

exports.cid = cid
