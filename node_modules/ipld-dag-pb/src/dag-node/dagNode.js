'use strict'

const withIs = require('class-is')
const { Buffer } = require('buffer')
const sortLinks = require('./sortLinks')
const DAGLink = require('../dag-link/dagLink')
const { serializeDAGNode } = require('../serialize.js')
const toDAGLink = require('./toDagLink')
const addLink = require('./addLink')
const rmLink = require('./rmLink')

class DAGNode {
  constructor (data, links = [], serializedSize = null) {
    if (!data) {
      data = Buffer.alloc(0)
    }
    if (typeof data === 'string') {
      data = Buffer.from(data)
    }
    if (!Buffer.isBuffer(data)) {
      throw new Error('Passed \'data\' is not a buffer or a string!')
    }

    if (serializedSize !== null && typeof serializedSize !== 'number') {
      throw new Error('Passed \'serializedSize\' must be a number!')
    }

    links = links.map((link) => {
      return DAGLink.isDAGLink(link)
        ? link
        : DAGLink.util.createDagLinkFromB58EncodedHash(link)
    })
    links = sortLinks(links)

    this._data = data
    this._links = links
    this._serializedSize = serializedSize
    this._size = null
  }

  toJSON () {
    if (!this._json) {
      this._json = Object.freeze({
        data: this.Data,
        links: this._links.map((l) => l.toJSON()),
        size: this.size
      })
    }

    return Object.assign({}, this._json)
  }

  toString () {
    return `DAGNode <data: "${this.Data.toString('base64')}", links: ${this.Links.length}, size: ${this.size}>`
  }

  _invalidateCached () {
    this._serializedSize = null
    this._size = null
  }

  addLink (link) {
    this._invalidateCached()
    return addLink(this, link)
  }

  rmLink (link) {
    this._invalidateCached()
    return rmLink(this, link)
  }

  // @returns {Promise.<DAGLink>}
  toDAGLink (options) {
    return toDAGLink(this, options)
  }

  serialize () {
    return serializeDAGNode({
      Data: this._data,
      Links: this._links
    })
  }

  get size () {
    if (this._size === null) {
      if (this._serializedSize === null) {
        this._serializedSize = this.serialize().length
      }
      this._size = this._links.reduce((sum, l) => sum + l.Tsize, this._serializedSize)
    }

    return this._size
  }

  set size (size) {
    throw new Error("Can't set property: 'size' is immutable")
  }

  // Getters for backwards compatible path resolving
  get Data () {
    return this._data
  }

  set Data (_) {
    throw new Error("Can't set property: 'Data' is immutable")
  }

  get Links () {
    return this._links.map((link) => {
      return {
        Name: link.Name,
        Tsize: link.Tsize,
        Hash: link.Hash
      }
    })
  }

  set Links (_) {
    throw new Error("Can't set property: 'Links' is immutable")
  }
}

exports = module.exports = withIs(DAGNode, { className: 'DAGNode', symbolName: '@ipld/js-ipld-dag-pb/dagnode' })
