'use strict'

const sortLinks = require('./sortLinks')
const DAGLink = require('../dag-link/dagLink')
const { createDagLinkFromB58EncodedHash } = require('../dag-link/util')
const { serializeDAGNode } = require('../serialize')
const toDAGLink = require('./toDagLink')
const addLink = require('./addLink')
const rmLink = require('./rmLink')
const uint8ArrayFromString = require('uint8arrays/from-string')
const uint8ArrayToString = require('uint8arrays/to-string')

/**
 * @typedef {import('cids')} CID
 * @typedef {import('../types').DAGLinkLike} DAGLinkLike
 */

class DAGNode {
  /**
   *@param {Uint8Array | string} [data]
   * @param {(DAGLink | DAGLinkLike)[]} links
   * @param {number | null} [serializedSize]
   */
  constructor (data, links = [], serializedSize = null) {
    if (!data) {
      data = new Uint8Array(0)
    }
    if (typeof data === 'string') {
      data = uint8ArrayFromString(data)
    }

    if (!(data instanceof Uint8Array)) {
      throw new Error('Passed \'data\' is not a Uint8Array or a String!')
    }

    if (serializedSize !== null && typeof serializedSize !== 'number') {
      throw new Error('Passed \'serializedSize\' must be a number!')
    }

    const sortedLinks = links.map((link) => {
      return link instanceof DAGLink
        ? link
        : createDagLinkFromB58EncodedHash(link)
    })
    sortLinks(sortedLinks)

    this.Data = data
    this.Links = sortedLinks

    Object.defineProperties(this, {
      _serializedSize: { value: serializedSize, writable: true, enumerable: false },
      _size: { value: null, writable: true, enumerable: false }
    })
  }

  toJSON () {
    if (!this._json) {
      this._json = Object.freeze({
        data: this.Data,
        links: this.Links.map((l) => l.toJSON()),
        size: this.size
      })
    }

    return Object.assign({}, this._json)
  }

  toString () {
    return `DAGNode <data: "${uint8ArrayToString(this.Data, 'base64urlpad')}", links: ${this.Links.length}, size: ${this.size}>`
  }

  _invalidateCached () {
    this._serializedSize = null
    this._size = null
  }

  /**
   * @param {DAGLink | import('../types').DAGLinkLike} link
   */
  addLink (link) {
    this._invalidateCached()
    return addLink(this, link)
  }

  /**
   * @param {DAGLink | string | CID} link
   */
  rmLink (link) {
    this._invalidateCached()
    return rmLink(this, link)
  }

  /**
   * @param {import('./toDagLink').ToDagLinkOptions} [options]
   */
  toDAGLink (options) {
    return toDAGLink(this, options)
  }

  serialize () {
    const buf = serializeDAGNode(this)

    this._serializedSize = buf.length

    return buf
  }

  get size () {
    if (this._size == null) {
      let serializedSize

      if (serializedSize == null) {
        this._serializedSize = this.serialize().length
        serializedSize = this._serializedSize
      }

      this._size = this.Links.reduce((sum, l) => sum + l.Tsize, serializedSize)
    }

    return this._size
  }

  set size (size) {
    throw new Error("Can't set property: 'size' is immutable")
  }
}

module.exports = DAGNode
