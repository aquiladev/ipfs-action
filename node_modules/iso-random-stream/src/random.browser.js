'use strict'

// limit of Crypto.getRandomValues()
// https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues
const MAX_BYTES = 65536

/**
 * @param {number} size
 */
function randomBytes(size) {
  const bytes = new Uint8Array(size)
  let generated = 0

  if (size > 0) {
    // getRandomValues fails on IE if size == 0
    if (size > MAX_BYTES) {
      while (generated < size) {
        if (generated + MAX_BYTES > size) {
          crypto.getRandomValues(
            bytes.subarray(generated, generated + (size - generated))
          )
          generated += size - generated
        } else {
          crypto.getRandomValues(
            bytes.subarray(generated, generated + MAX_BYTES)
          )
          generated += MAX_BYTES
        }
      }
    } else {
      crypto.getRandomValues(bytes)
    }
  }

  return bytes
}

module.exports = randomBytes
