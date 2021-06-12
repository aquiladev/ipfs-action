'use strict'

const sort = require('stable')
const uint8ArrayCompare = require('uint8arrays/compare')

/**
 * @typedef {import('../dag-link/dagLink')} DAGLink
 */

/**
 *
 * @param {DAGLink} a
 * @param {DAGLink} b
 */
const linkSort = (a, b) => {
  const buf1 = a.nameAsBuffer
  const buf2 = b.nameAsBuffer

  return uint8ArrayCompare(buf1, buf2)
}

/**
 * Sorts links in place (mutating given array)
 *
 * @param {DAGLink[]} links
 * @returns {void}
 */
const sortLinks = (links) => {
  sort.inplace(links, linkSort)
}

module.exports = sortLinks
