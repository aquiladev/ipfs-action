'use strict'

const assert = require('assert')
const withIs = require('class-is')
const addNamedLink = require('./addNamedLink')
const visibility = require('../visibility')

class DAGNode {
  constructor (data, links, serializedSize) {
    if (serializedSize !== 0) {
      assert(serializedSize, 'A DAGNode requires it\'s serialized size')
    }

    this._data = data || Buffer.alloc(0)
    this._links = links
    this._serializedSize = serializedSize

    // Make sure we have a nice public API that can be used by an IPLD resolver
    visibility.hidePrivateFields(this)
    visibility.addEnumerableGetters(this, ['Data', 'Links'])

    // Add getters for existing links by the name of the link
    // This is how paths are traversed in IPFS. Links with names won't
    // override existing fields like `data` or `links`.
    links.forEach((link, position) => {
      addNamedLink(this, link.Name, position)
    })
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

  get size () {
    if (this._size === undefined) {
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
exports.create = require('./create')
exports.clone = require('./clone')
exports.addLink = require('./addLink')
exports.rmLink = require('./rmLink')
