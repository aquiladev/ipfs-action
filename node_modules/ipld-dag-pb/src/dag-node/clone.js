'use strict'

const dagNodeUtil = require('./util')
const cloneLinks = dagNodeUtil.cloneLinks
const cloneData = dagNodeUtil.cloneData
const create = require('./create')

function clone (dagNode) {
  const data = cloneData(dagNode)
  const links = cloneLinks(dagNode)
  return create(data, links)
}

module.exports = clone
