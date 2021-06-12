'use strict'
const { Buffer } = require('buffer')

class Base {
  constructor (name, code, implementation, alphabet) {
    this.name = name
    this.code = code
    this.codeBuf = Buffer.from(this.code)
    this.alphabet = alphabet
    this.engine = implementation(alphabet)
  }

  encode (buf) {
    return this.engine.encode(buf)
  }

  decode (string) {
    for (const char of string) {
      if (this.alphabet && this.alphabet.indexOf(char) < 0) {
        throw new Error(`invalid character '${char}' in '${string}'`)
      }
    }
    return this.engine.decode(string)
  }
}

module.exports = Base
