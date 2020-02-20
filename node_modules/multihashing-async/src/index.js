'use strict'

const { Buffer } = require('buffer')
const errcode = require('err-code')
const multihash = require('multihashes')
const crypto = require('./crypto')

/**
 * Hash the given `buf` using the algorithm specified by `alg`.
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} alg - The algorithm to use eg 'sha1'
 * @param {number} [length] - Optionally trim the result to this length.
 * @returns {Promise<Buffer>}
 */
async function Multihashing (buf, alg, length) {
  const digest = await Multihashing.digest(buf, alg, length)
  return multihash.encode(digest, alg, length)
}

/**
 * The `buffer` module for easy use in the browser.
 *
 * @type {Buffer}
 */
Multihashing.Buffer = Buffer // for browser things

/**
 * Expose multihash itself, to avoid silly double requires.
 */
Multihashing.multihash = multihash

/**
 * @param {Buffer} buf - The value to hash.
 * @param {number|string} alg - The algorithm to use eg 'sha1'
 * @param {number} [length] - Optionally trim the result to this length.
 * @returns {Promise<Buffer>}
 */
Multihashing.digest = async (buf, alg, length) => {
  const hash = Multihashing.createHash(alg)
  const digest = await hash(buf)
  return length ? digest.slice(0, length) : digest
}

/**
 * Creates a function that hashes with the given algorithm
 *
 * @param {string|number} alg - The algorithm to use eg 'sha1'
 *
 * @returns {function} - The hash function corresponding to `alg`
 */
Multihashing.createHash = function (alg) {
  if (!alg) {
    throw errcode(new Error('hash algorithm must be specified'), 'ERR_HASH_ALGORITHM_NOT_SPECIFIED')
  }

  alg = multihash.coerceCode(alg)
  if (!Multihashing.functions[alg]) {
    throw errcode(new Error(`multihash function '${alg}' not yet supported`), 'ERR_HASH_ALGORITHM_NOT_SUPPORTED')
  }

  return Multihashing.functions[alg]
}

/**
 * Mapping of multihash codes to their hashing functions.
 * @type {Object}
 */
Multihashing.functions = {
  // identity
  0x00: crypto.identity,
  // sha1
  0x11: crypto.sha1,
  // sha2-256
  0x12: crypto.sha2256,
  // sha2-512
  0x13: crypto.sha2512,
  // sha3-512
  0x14: crypto.sha3512,
  // sha3-384
  0x15: crypto.sha3384,
  // sha3-256
  0x16: crypto.sha3256,
  // sha3-224
  0x17: crypto.sha3224,
  // shake-128
  0x18: crypto.shake128,
  // shake-256
  0x19: crypto.shake256,
  // keccak-224
  0x1A: crypto.keccak224,
  // keccak-256
  0x1B: crypto.keccak256,
  // keccak-384
  0x1C: crypto.keccak384,
  // keccak-512
  0x1D: crypto.keccak512,
  // murmur3-128
  0x22: crypto.murmur3128,
  // murmur3-32
  0x23: crypto.murmur332,
  // dbl-sha2-256
  0x56: crypto.dblSha2256
}

// add blake functions
crypto.addBlake(Multihashing.functions)

Multihashing.validate = async (buf, hash) => {
  const newHash = await Multihashing(buf, multihash.decode(hash).name)

  return Buffer.compare(hash, newHash) === 0
}

module.exports = Multihashing
