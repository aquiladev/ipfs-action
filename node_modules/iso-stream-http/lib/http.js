var ClientRequest = require('./request')
var IncomingMessage = require('./incoming-message')
var statusCodes = require('builtin-status-codes')
var URL = self.URL


const request = (opts, cb) => {
	if (typeof opts === 'string') {

		opts = new URL(opts, self.location.protocol + '//' +self.location.host)
		opts.path = opts.pathname + opts.search
		opts.auth = (opts.username && opts.password) ? opts.username + ':' + opts.password : null
	} else {
		opts = Object.assign({}, opts)
	}

	// Normally, the page is loaded from http or https, so not specifying a protocol
	// will result in a (valid) protocol-relative url. However, this won't work if
	// the protocol is something else, like 'file:'
	var defaultProtocol = global.location.protocol.search(/^https?:$/) === -1 ? 'http:' : ''

	var protocol = opts.protocol || defaultProtocol
	var host = opts.hostname || opts.host
	var port = opts.port
	var path = opts.path || '/'

	// Necessary for IPv6 addresses
	if (host && host.indexOf(':') !== -1)
		host = '[' + host + ']'

	// This may be a relative url. The browser should always be able to interpret it correctly.
	opts.url = (host ? (protocol + '//' + host) : '') + (port ? ':' + port : '') + path
	opts.method = (opts.method || 'GET').toUpperCase()
	opts.headers = opts.headers || {}

	// Also valid opts.auth, opts.mode

	var req = new ClientRequest(opts)
	if (cb)
		req.on('response', cb)
	return req
}

const get = (opts, cb) => {
	var req = request(opts, cb)
	req.end()
	return req
}

const Agent = function () {}
Agent.defaultMaxSockets = 4

const METHODS = [
	'CHECKOUT',
	'CONNECT',
	'COPY',
	'DELETE',
	'GET',
	'HEAD',
	'LOCK',
	'M-SEARCH',
	'MERGE',
	'MKACTIVITY',
	'MKCOL',
	'MOVE',
	'NOTIFY',
	'OPTIONS',
	'PATCH',
	'POST',
	'PROPFIND',
	'PROPPATCH',
	'PURGE',
	'PUT',
	'REPORT',
	'SEARCH',
	'SUBSCRIBE',
	'TRACE',
	'UNLOCK',
	'UNSUBSCRIBE'
]

module.exports = {
	Agent,
	ClientRequest,
	IncomingMessage,
	METHODS,
	STATUS_CODES: statusCodes,
	get,
	globalAgent : new Agent(),
	request,
	maxHeaderSize: '8KB'

}