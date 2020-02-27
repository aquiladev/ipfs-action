'use strict'
const crypto = require('crypto')

// Note that although this function doesn't do any asynchronous work, we mark
// the function as async because it must return a Promise to match the API
// for other functions that do perform asynchronous work (see sha.browser.js)
module.exports = (algorithm) => async (data) => {
  switch (algorithm) {
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
      throw new Error(`${algorithm} is not a supported algorithm`)
  }
}
