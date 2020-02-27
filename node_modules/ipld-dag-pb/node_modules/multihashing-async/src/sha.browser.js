'use strict'

const { Buffer } = require('buffer')

const crypto = self.crypto || self.msCrypto

module.exports = (algorithm) => {
  if (typeof self === 'undefined' || (!self.crypto && !self.msCrypto)) {
    throw new Error(
      'Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context'
    )
  }

  return async (data) => {
    switch (algorithm) {
      case 'sha1':
        return Buffer.from(await crypto.subtle.digest({ name: 'SHA-1' }, data))
      case 'sha2-256':
        return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, data))
      case 'sha2-512':
        return Buffer.from(await crypto.subtle.digest({ name: 'SHA-512' }, data))
      case 'dbl-sha2-256': {
        const d = await crypto.subtle.digest({ name: 'SHA-256' }, data)
        return Buffer.from(await crypto.subtle.digest({ name: 'SHA-256' }, d))
      }
      default:
        throw new Error(`${algorithm} is not a supported algorithm`)
    }
  }
}
