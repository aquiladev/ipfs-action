'use strict'
const CID = require('cids')
const multihashing = require('multihashing-async')
const multicodec = require('multicodec')

// binary resolver
module.exports = {
  codec: multicodec.RAW,
  defaultHashAlg: multicodec.SHA2_256,
  resolver: {
    /**
     * Resolves a path within a Raw block.
     *
     * Always returns the raw data as value without any remainderPath.
     *
     * @param {Buffer} binaryBlob - Binary representation of a PB block
     * @param {string} [path='/'] - Path that should be resolved.  Must be '/' or an exception is thrown
     * @returns {Object} result - Result of the path it it was resolved successfully
     * @returns {*} result.value - The raw data
     * @returns {string} result.remainderPath - An empty string
     */
    resolve: (binaryBlob, path) => {
      if (path !== '/') {
        throw new Error('Only the root path / may be resolved')
      }

      return {
        value: binaryBlob,
        remainderPath: ''
      }
    },
    /**
     * Return all available paths of a block.
     *
     * @generator
     * @param {Buffer} binaryBlob - The raw data
     * @returns {Object} - Finished generator with `done: true`
     */
    tree: (binaryBlob) => {
      return {
        done: true
      }
    }
  },
  util: {
    deserialize: (data) => {
      return data
    },
    serialize: (data) => {
      return data
    },
    /**
     * Calculate the CID of the binary blob.
     *
     * @param {Object} binaryBlob - Encoded IPLD Node
     * @param {Object} [userOptions] - Options to create the CID
     * @param {number} [userOptions.cidVersion=1] - CID version number
     * @param {string} [UserOptions.hashAlg] - Defaults to the defaultHashAlg of the format
     * @returns {Promise.<CID>}
     */
    cid: async (binaryBlob, userOptions) => {
      const defaultOptions = { cidVersion: 1, hashAlg: module.exports.defaultHashAlg }
      const options = Object.assign(defaultOptions, userOptions)

      const multihash = await multihashing(binaryBlob, options.hashAlg)
      const codecName = multicodec.print[module.exports.codec]
      const cid = new CID(options.cidVersion, codecName, multihash)

      return cid
    }
  }
}
