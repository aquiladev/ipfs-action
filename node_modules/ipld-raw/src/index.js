'use strict'
const CID = require('cids')
const multihashing = require('multihashing-async')
const { multihash } = multihashing
const multicodec = require('multicodec')

/**
 * @typedef {import('cids').CIDVersion} CIDVersion
 * @typedef {import('multihashing-async').multihash.HashCode} HashCode
 * @typedef {import('interface-ipld-format').Format<Uint8Array>} RawFormat
 */

/**
 * Binary resolver
 *
 * @type {RawFormat}
 */
module.exports = {
  codec: multicodec.RAW,
  defaultHashAlg: multihash.names['sha2-256'],
  resolver: {
    /**
     * Resolves a path within a Raw block.
     *
     * Always returns the raw data as value without any remainderPath.
     *
     * @param {Uint8Array} binaryBlob - Binary representation of a PB block
     * @param {string} [path='/'] - Path that should be resolved.  Must be '/' or an exception is thrown
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
     * @param {Uint8Array} binaryBlob - The raw data
     */
    async * tree (binaryBlob) {

    }
  },
  util: {
    /**
     * @param {Uint8Array} data
     */
    deserialize: (data) => {
      return data
    },
    /**
     * @param {Uint8Array} data
     */
    serialize: (data) => {
      return data
    },
    /**
     * Calculate the CID of the binary blob.
     *
     * @param {Uint8Array} binaryBlob - Encoded IPLD Node
     * @param {Object} [userOptions] - Options to create the CID
     * @param {CIDVersion} [userOptions.cidVersion=1] - CID version number
     * @param {HashCode} [userOptions.hashAlg=multihash.names['sha2-256']] - Defaults to the defaultHashAlg of the format
     */
    cid: async (binaryBlob, userOptions = {}) => {
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
  }
}
