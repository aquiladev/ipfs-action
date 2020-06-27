/* eslint-disable require-await */
'use strict'
const crypto = require('crypto')
const multihash = require('multihashes')

// Note that although this function doesn't do any asynchronous work, we mark
// the function as async because it must return a Promise to match the API
// for other functions that do perform asynchronous work (see sha.browser.js)
// eslint-disable-next-line
const digest = async (data, alg) => {
  switch (alg) {
    case 'sha1':
      return crypto.createHash('sha1').update(data).digest()
    case 'sha2-256':
      return crypto.createHash('sha256').update(data).digest()
    case 'sha2-512':
      return crypto.createHash('sha512').update(data).digest()
    case 'dbl-sha2-256': {
      const first = crypto.createHash('sha256').update(data).digest()
      return crypto.createHash('sha256').update(first).digest()
    }
    default:
      throw new Error(`${alg} is not a supported algorithm`)
  }
}

module.exports = {
  factory: (alg) => async (data) => {
    return digest(data, alg)
  },
  digest,
  multihashing: async (buf, alg, length) => {
    const h = await digest(buf, alg, length)
    return multihash.encode(h, alg, length)
  }
}
