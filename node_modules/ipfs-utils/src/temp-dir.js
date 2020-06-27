'use strict'

const fs = require('fs')
const os = require('os')
const path = require('path')
const { nanoid } = require('nanoid')

/**
 * Temporary folder
 *
 * @param {function(string): string} transform - Transform function to add prefixes or sufixes to the unique id
 * @returns {string} - Full real path to a temporary folder
 */
const tempdir = (transform = d => d) => {
  const osTmpDir = fs.realpathSync(os.tmpdir())
  return path.join(osTmpDir, transform(nanoid()))
}

module.exports = tempdir
