'use strict'

const { Buffer } = require('buffer')
const sort = require('stable')

const linkSort = (a, b) => {
  return Buffer.compare(a.nameAsBuffer, b.nameAsBuffer)
}

/**
 *
 * @param {Array} links
 * @returns {Array}
 */
const sortLinks = (links) => {
  return sort(links, linkSort)
}

module.exports = sortLinks
