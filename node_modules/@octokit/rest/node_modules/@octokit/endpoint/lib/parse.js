module.exports = toRequestOptions

const urlTemplate = require('url-template')
const addQueryParameters = require('./util/add-query-parameters')
const extractUrlVariableNames = require('./util/extract-url-variable-names')
const omit = require('./util/omit')

function toRequestOptions (options) {
  // https://fetch.spec.whatwg.org/#methods
  let method = options.method.toUpperCase()

  // replace :varname with {varname} to make it RFC 6570 compatible
  let url = options.url.replace(/:([a-z]\w+)/g, '{+$1}')
  let headers = Object.assign({}, options.headers)
  let body
  let parameters = omit(options, ['method', 'baseUrl', 'url', 'headers', 'request', 'mediaType'])

  // extract variable names from URL to calculate remaining variables later
  const urlVariableNames = extractUrlVariableNames(url)

  url = urlTemplate.parse(url).expand(parameters)

  if (!/^http/.test(url)) {
    url = options.baseUrl + url
  }

  const omittedParameters = Object.keys(options).filter((option) => urlVariableNames.includes(option)).concat('baseUrl')
  const remainingParameters = omit(parameters, omittedParameters)

  if (options.mediaType.format) {
    // e.g. application/vnd.github.v3+json => application/vnd.github.v3.raw
    headers.accept = headers.accept
      .split(/,/)
      .map(preview => preview.replace(/application\/vnd(\.\w+)(\.v3)?(\.\w+)?(\+json)?$/, `application/vnd$1$2.${options.mediaType.format}`))
      .join(',')
  }

  if (options.mediaType.previews.length) {
    const previewsFromAcceptHeader = headers.accept.match(/[\w-]+(?=-preview)/g) || []
    headers.accept = previewsFromAcceptHeader
      .concat(options.mediaType.previews)
      .map(preview => {
        const format = options.mediaType.format ? `.${options.mediaType.format}` : '+json'
        return `application/vnd.github.${preview}-preview${format}`
      })
      .join(',')
  }

  // for GET/HEAD requests, set URL query parameters from remaining parameters
  // for PATCH/POST/PUT/DELETE requests, set request body from remaining parameters
  if (['GET', 'HEAD'].includes(method)) {
    url = addQueryParameters(url, remainingParameters)
  } else {
    if ('data' in remainingParameters) {
      body = remainingParameters.data
    } else {
      if (Object.keys(remainingParameters).length) {
        body = remainingParameters
      } else {
        headers['content-length'] = 0
      }
    }
  }

  // default content-type for JSON if body is set
  if (!headers['content-type'] && typeof body !== 'undefined') {
    headers['content-type'] = 'application/json; charset=utf-8'
  }

  // GitHub expects "content-length: 0" header for PUT/PATCH requests without body.
  // fetch does not allow to set `content-length` header, but we can set body to an empty string
  if (['PATCH', 'PUT'].includes(method) && typeof body === 'undefined') {
    body = ''
  }

  // Only return body/request keys if present
  return Object.assign(
    { method: method, url, headers },
    typeof body !== 'undefined' ? { body } : null,
    options.request ? { request: options.request } : null
  )
}
