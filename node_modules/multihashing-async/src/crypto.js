'use strict'

const { Buffer } = require('buffer')
const sha3 = require('js-sha3')
const mur = require('murmurhash3js-revisited')
const { factory: sha } = require('./sha')
const { fromNumberTo32BitBuf } = require('./utils')

// Note that although this function doesn't do any asynchronous work, we mark
// the function as async because it must return a Promise to match the API
// for other functions that do perform asynchronous work (see sha.browser.js)
// eslint-disable-next-line
const hash = (algorithm) => async (data) => {
  switch (algorithm) {
    case 'sha3-224':
      return Buffer.from(sha3.sha3_224.arrayBuffer(data))
    case 'sha3-256':
      return Buffer.from(sha3.sha3_256.arrayBuffer(data))
    case 'sha3-384':
      return Buffer.from(sha3.sha3_384.arrayBuffer(data))
    case 'sha3-512':
      return Buffer.from(sha3.sha3_512.arrayBuffer(data))
    case 'shake-128':
      return Buffer.from(sha3.shake128.create(128).update(data).arrayBuffer())
    case 'shake-256':
      return Buffer.from(sha3.shake256.create(256).update(data).arrayBuffer())
    case 'keccak-224':
      return Buffer.from(sha3.keccak224.arrayBuffer(data))
    case 'keccak-256':
      return Buffer.from(sha3.keccak256.arrayBuffer(data))
    case 'keccak-384':
      return Buffer.from(sha3.keccak384.arrayBuffer(data))
    case 'keccak-512':
      return Buffer.from(sha3.keccak512.arrayBuffer(data))
    case 'murmur3-128':
      return Buffer.from(mur.x64.hash128(data), 'hex')
    case 'murmur3-32':
      return fromNumberTo32BitBuf(mur.x86.hash32(data))

    default:
      throw new TypeError(`${algorithm} is not a supported algorithm`)
  }
}

const identity = data => Buffer.from(data)

module.exports = {
  identity,
  sha1: sha('sha1'),
  sha2256: sha('sha2-256'),
  sha2512: sha('sha2-512'),
  dblSha2256: sha('dbl-sha2-256'),
  sha3224: hash('sha3-224'),
  sha3256: hash('sha3-256'),
  sha3384: hash('sha3-384'),
  sha3512: hash('sha3-512'),
  shake128: hash('shake-128'),
  shake256: hash('shake-256'),
  keccak224: hash('keccak-224'),
  keccak256: hash('keccak-256'),
  keccak384: hash('keccak-384'),
  keccak512: hash('keccak-512'),
  murmur3128: hash('murmur3-128'),
  murmur332: hash('murmur3-32'),
  addBlake: require('./blake')
}
