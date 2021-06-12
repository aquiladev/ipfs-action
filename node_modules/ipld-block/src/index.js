'use strict'

const CID = require('cids')

const { version } = require('../package.json')
const blockSymbol = Symbol.for('@ipld/js-ipld-block/block')
const readonly = { writable: false, configurable: false, enumerable: true }

/**
 * Represents an immutable block of data that is uniquely referenced with a cid.
 *
 * @example
 * const block = new Block(Uint8Array.from([0, 1, 2, 3]), new CID('...'))
 */
class Block {
  /**
   * @param {Uint8Array} data - The data to be stored in the block as a Uint8Array.
   * @param {CID} cid - The cid of the data
   */
  constructor (data, cid) {
    if (!data || !(data instanceof Uint8Array)) {
      throw new Error('first argument  must be a Uint8Array')
    }

    if (!cid || !CID.isCID(cid)) {
      throw new Error('second argument must be a CID')
    }

    this.data = data
    this.cid = cid

    Object.defineProperties(this, {
      data: readonly,
      cid: readonly
    })
  }

  /**
   * The data of this block.
   *
   * @deprecated
   * @type {Uint8Array}
   */
  get _data () {
    deprecateData()
    return this.data
  }

  /**
   * The cid of the data this block represents.
   *
   * @deprecated
   * @type {CID}
   */
  get _cid () {
    deprecateCID()
    return this.cid
  }

  get [Symbol.toStringTag] () {
    return 'Block'
  }

  get [blockSymbol] () {
    return true
  }

  /**
   * Check if the given value is a Block.
   *
   * @param {any} other
   * @returns {other is Block}
   */
  static isBlock (other) {
    return Boolean(other && other[blockSymbol])
  }
}

/**
 * @param {RegExp} range
 * @param {string} message
 * @returns {() => void}
 */
const deprecate = (range, message) => {
  let warned = false
  return () => {
    if (range.test(version)) {
      if (!warned) {
        warned = true
        // eslint-disable-next-line no-console
        console.warn(message)
      }
    } else {
      throw new Error(message)
    }
  }
}

const deprecateCID = deprecate(/^0\.10|^0\.11/, 'block._cid is deprecated and will be removed in 0.12 release. Please use block.cid instead')
const deprecateData = deprecate(/^0\.10|^0.11/, 'block._data is deprecated and will be removed in 0.12 release. Please use block.data instead')

module.exports = Block
