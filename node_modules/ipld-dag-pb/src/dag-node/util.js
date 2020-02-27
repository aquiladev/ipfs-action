'use strict'

const DAGLink = require('./../dag-link')
const {
  cid,
  serialize
} = require('../util')

exports = module.exports

function cloneData (dagNode) {
  let data

  if (dagNode.Data && dagNode.Data.length > 0) {
    data = Buffer.alloc(dagNode.Data.length)
    dagNode.Data.copy(data)
  } else {
    data = Buffer.alloc(0)
  }

  return data
}

function cloneLinks (dagNode) {
  return dagNode.Links.slice()
}

function linkSort (a, b) {
  return Buffer.compare(a.nameAsBuffer, b.nameAsBuffer)
}

/*
 * toDAGLink converts a DAGNode to a DAGLink
 */
const toDAGLink = async (node, options = {}) => {
  const serialized = serialize(node)
  const nodeCid = await cid(serialized)
  return new DAGLink(options.name || '', serialized.length, nodeCid)
}

exports.cloneData = cloneData
exports.cloneLinks = cloneLinks
exports.linkSort = linkSort
exports.toDAGLink = toDAGLink
