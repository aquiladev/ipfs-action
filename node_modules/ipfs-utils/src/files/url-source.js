'use strict'

const Http = require('../http')

module.exports = async function * urlSource (url, options) {
  const http = new Http()
  const response = await http.get(url, options)

  yield {
    path: decodeURIComponent(new URL(url).pathname.split('/').pop() || ''),
    content: response.iterator()
  }
}
