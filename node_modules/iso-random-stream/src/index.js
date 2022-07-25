'use strict'

const { Readable } = require('readable-stream')
const randomBytes = require('./random')

const randomStream = (size = Infinity) => {
  let currentSize = 0

  return new Readable({
    read(readSize) {
      if (currentSize >= size) {
        return this.push(null)
      } else if (currentSize + readSize >= size) {
        readSize = size - currentSize
      }
      currentSize += readSize
      this.push(randomBytes(readSize))
    },
  })
}

module.exports = {
  randomStream,
  randomBytes,
}
