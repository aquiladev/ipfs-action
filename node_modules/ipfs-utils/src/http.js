/* eslint-disable no-undef */
'use strict'

const fetch = require('node-fetch')
const merge = require('merge-options').bind({ ignoreUndefined: true })
const { URL, URLSearchParams } = require('iso-url')
const TextDecoder = require('./text-decoder')
const AbortController = require('abort-controller')
const anySignal = require('any-signal')

const Request = fetch.Request
const Headers = fetch.Headers

class TimeoutError extends Error {
  constructor () {
    super('Request timed out')
    this.name = 'TimeoutError'
  }
}

class HTTPError extends Error {
  constructor (response) {
    super(response.statusText)
    this.name = 'HTTPError'
    this.response = response
  }
}

const timeout = (promise, ms, abortController) => {
  if (ms === undefined) {
    return promise
  }

  const start = Date.now()

  const timedOut = () => {
    const time = Date.now() - start

    return time >= ms
  }

  return new Promise((resolve, reject) => {
    const timeoutID = setTimeout(() => {
      if (timedOut()) {
        reject(new TimeoutError())
        abortController.abort()
      }
    }, ms)

    const after = (next) => {
      return (res) => {
        clearTimeout(timeoutID)

        if (timedOut()) {
          reject(new TimeoutError())
          return
        }

        next(res)
      }
    }

    promise
      .then(after(resolve), after(reject))
  })
}

const defaults = {
  headers: {},
  throwHttpErrors: true,
  credentials: 'same-origin',
  transformSearchParams: p => p
}

/**
 * @typedef {Object} APIOptions - creates a new type named 'SpecialType'
 * @prop {any} [body] - Request body
 * @prop {Object} [json] - JSON shortcut
 * @prop {string} [method] - GET, POST, PUT, DELETE, etc.
 * @prop {string} [base] - The base URL to use in case url is a relative URL
 * @prop {Headers|Record<string, string>} [headers] - Request header.
 * @prop {number} [timeout] - Amount of time until request should timeout in ms.
 * @prop {AbortSignal} [signal] - Signal to abort the request.
 * @prop {URLSearchParams|Object} [searchParams] - URL search param.
 * @prop {string} [credentials]
 * @prop {boolean} [throwHttpErrors]
 * @prop {function(URLSearchParams): URLSearchParams } [transformSearchParams]
 * @prop {function(any): any} [transform] - When iterating the response body, transform each chunk with this function.
 * @prop {function(Response): Promise<void>} [handleError] - Handle errors
 */

class HTTP {
  /**
   *
   * @param {APIOptions} options
   */
  constructor (options = {}) {
    /** @type {APIOptions} */
    this.opts = merge(defaults, options)
  }

  /**
   * Fetch
   *
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  async fetch (resource, options = {}) {
    /** @type {APIOptions} */
    const opts = merge(this.opts, options)
    opts.headers = new Headers(opts.headers)

    // validate resource type
    if (typeof resource !== 'string' && !(resource instanceof URL || resource instanceof Request)) {
      throw new TypeError('`resource` must be a string, URL, or Request')
    }

    // validate resource format and normalize with prefixUrl
    if (opts.base && typeof opts.base === 'string' && typeof resource === 'string') {
      if (resource.startsWith('/')) {
        throw new Error('`resource` must not begin with a slash when using `base`')
      }

      if (!opts.base.endsWith('/')) {
        opts.base += '/'
      }

      resource = opts.base + resource
    }

    // TODO: try to remove the logic above or fix URL instance input without trailing '/'
    const url = new URL(resource, opts.base)

    if (opts.searchParams) {
      url.search = opts.transformSearchParams(new URLSearchParams(opts.searchParams))
    }

    if (opts.json !== undefined) {
      opts.body = JSON.stringify(opts.json)
      opts.headers.set('content-type', 'application/json')
    }

    const abortController = new AbortController()
    const signal = anySignal([abortController.signal, opts.signal])

    const response = await timeout(fetch(url, {
      ...opts,
      signal,
      timeout: undefined
    }), opts.timeout, abortController)

    if (!response.ok && opts.throwHttpErrors) {
      if (opts.handleError) {
        await opts.handleError(response)
      }
      throw new HTTPError(response)
    }

    response.iterator = function () {
      const it = streamToAsyncIterator(response.body)

      if (!isAsyncIterator(it)) {
        throw new Error('Can\'t convert fetch body into a Async Iterator:')
      }

      return it
    }

    response.ndjson = async function * () {
      for await (const chunk of ndjson(response.iterator())) {
        if (options.transform) {
          yield options.transform(chunk)
        } else {
          yield chunk
        }
      }
    }

    return response
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  post (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'POST'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  get (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'GET'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  put (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'PUT'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  delete (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'DELETE'
    })
  }

  /**
   * @param {string | URL | Request} resource
   * @param {APIOptions} options
   * @returns {Promise<Response>}
   */
  options (resource, options = {}) {
    return this.fetch(resource, {
      ...options,
      method: 'OPTIONS'
    })
  }
}

/**
 * Parses NDJSON chunks from an iterator
 *
 * @param {AsyncGenerator<Uint8Array, void, any>} source
 * @returns {AsyncGenerator<Object, void, any>}
 */
const ndjson = async function * (source) {
  const decoder = new TextDecoder()
  let buf = ''

  for await (const chunk of source) {
    buf += decoder.decode(chunk, { stream: true })
    const lines = buf.split(/\r?\n/)

    for (let i = 0; i < lines.length - 1; i++) {
      const l = lines[i].trim()
      if (l.length > 0) {
        yield JSON.parse(l)
      }
    }
    buf = lines[lines.length - 1]
  }
  buf += decoder.decode()
  buf = buf.trim()
  if (buf.length !== 0) {
    yield JSON.parse(buf)
  }
}

const streamToAsyncIterator = function (source) {
  if (isAsyncIterator(source)) {
    // Workaround for https://github.com/node-fetch/node-fetch/issues/766
    if (Object.prototype.hasOwnProperty.call(source, 'readable') && Object.prototype.hasOwnProperty.call(source, 'writable')) {
      const iter = source[Symbol.asyncIterator]()

      const wrapper = {
        next: iter.next.bind(iter),
        return: () => {
          source.destroy()

          return iter.return()
        },
        [Symbol.asyncIterator]: () => {
          return wrapper
        }
      }

      return wrapper
    }

    return source
  }

  const reader = source.getReader()

  return {
    next () {
      return reader.read()
    },
    return () {
      reader.releaseLock()
      return {}
    },
    [Symbol.asyncIterator] () {
      return this
    }
  }
}

const isAsyncIterator = (obj) => {
  return typeof obj === 'object' &&
  obj !== null &&
  // typeof obj.next === 'function' &&
  typeof obj[Symbol.asyncIterator] === 'function'
}

HTTP.HTTPError = HTTPError
HTTP.TimeoutError = TimeoutError
HTTP.streamToAsyncIterator = streamToAsyncIterator

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.post = (resource, options) => new HTTP(options).post(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.get = (resource, options) => new HTTP(options).get(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.put = (resource, options) => new HTTP(options).put(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.delete = (resource, options) => new HTTP(options).delete(resource, options)

/**
 * @param {string | URL | Request} resource
 * @param {APIOptions} options
 * @returns {Promise<Response>}
 */
HTTP.options = (resource, options) => new HTTP(options).options(resource, options)

module.exports = HTTP
