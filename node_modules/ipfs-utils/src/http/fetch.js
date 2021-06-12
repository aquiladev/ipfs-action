'use strict'

if (typeof XMLHttpRequest === 'function') {
  // Electron has `XMLHttpRequest` and should get the browser implementation
  // instead of node.
  module.exports = require('./fetch.browser')
} else {
  module.exports = require('./fetch.node')
}
