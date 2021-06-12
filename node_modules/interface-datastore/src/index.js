'use strict'

/**
 * @typedef {import('./types').Datastore} Datastore
 * @typedef {import('./types').Batch} Batch
 * @typedef {import('interface-store').Options} Options
 * @typedef {import('./types').Query} Query
 * @typedef {import('./types').QueryFilter} QueryFilter
 * @typedef {import('./types').QueryOrder} QueryOrder
 * @typedef {import('./types').KeyQuery} KeyQuery
 * @typedef {import('./types').KeyQueryFilter} KeyQueryFilter
 * @typedef {import('./types').KeyQueryOrder} KeyQueryOrder
 * @typedef {import('./types').Pair} Pair
 */

const Key = require('./key')
const MemoryDatastore = require('./memory')
const utils = require('./utils')
const Errors = require('./errors')
const Adapter = require('./adapter')

module.exports = {
  Key,
  MemoryDatastore,
  utils,
  Errors,
  Adapter
}
