var capability = require('./capability')
var inherits = require('inherits')
var IncomingMessage = require('./incoming-message')
var stream = require('readable-stream')

var fetch = self.fetch

var ClientRequest = module.exports = function (opts) {
	stream.Writable.call(this)

	this._opts = opts
	this._body = []
	this._headers = {}
	if (opts.auth)
		this.setHeader('Authorization', 'Basic ' + Buffer.from(opts.auth).toString('base64'))


	Object.keys(opts.headers).forEach(name => {
		this.setHeader(name, opts.headers[name])
	})

	this._mode = 'fetch'
	this._fetchTimer = null

	this.on('finish',  () => this._onFinish())
}

inherits(ClientRequest, stream.Writable)

ClientRequest.prototype.setHeader = function (name, value) {
	var lowerName = name.toLowerCase()
	// This check is not necessary, but it prevents warnings from browsers about setting unsafe
	// headers. To be honest I'm not entirely sure hiding these warnings is a good thing, but
	// http-browserify did it, so I will too.
	if (unsafeHeaders.indexOf(lowerName) !== -1){
		return
	}
	this._headers[lowerName] = value
}

ClientRequest.prototype.getHeader = function (name) {
	var header = this._headers[name.toLowerCase()]
	if (header)
		return header.value
	return null
}

ClientRequest.prototype.removeHeader = function (name) {
	delete this._headers[name.toLowerCase()]
}

ClientRequest.prototype._onFinish = function () {
	if (this._destroyed)
		return
	var opts = this._opts

	var headersObj = this._headers
	var body = null
	if (opts.method !== 'GET' && opts.method !== 'HEAD') {
        body = new Blob(this._body, {
            type: (headersObj['content-type'] || {}).value || ''
        });
    }

	var signal = null
	if (capability.abortController) {
		var controller = new AbortController()
		signal = controller.signal
		this._fetchAbortController = controller

		if ('requestTimeout' in opts && opts.requestTimeout !== 0) {
			this._fetchTimer = setTimeout(() => {
				this.emit('requestTimeout')
				if (this._fetchAbortController)
					this._fetchAbortController.abort()
			}, opts.requestTimeout)
		}
	}

	fetch(this._opts.url, {
		method: this._opts.method,
		headers: this._headers,
		body: body || undefined,
		mode: 'cors',
		credentials: opts.withCredentials ? 'include' : 'same-origin',
		signal: signal
	})
	.then(response => {
		this._fetchResponse = response
		this._connect()
	}, reason => {
		clearTimeout(this._fetchTimer)
		if (!this._destroyed)
			this.emit('error', reason)
	})
}

ClientRequest.prototype._connect = function () {
	if (this._destroyed)
		return

	this._response = new IncomingMessage(this._fetchResponse, this._mode, this._fetchTimer)
	this._response.on('error', (err) => this.emit('error', err))

	this.emit('response', this._response)
}

ClientRequest.prototype._write = function (chunk, encoding, cb) {
	this._body.push(chunk)
	cb()
}

ClientRequest.prototype.abort = ClientRequest.prototype.destroy = function () {
	this._destroyed = true

	
	clearTimeout(this._fetchTimer)
	
	if (this._response)
		this._response._destroyed = true
	if (this._xhr)
		this._xhr.abort()
	else if (this._fetchAbortController)
		this._fetchAbortController.abort()
}

ClientRequest.prototype.end = function (data, encoding, cb) {
	if (typeof data === 'function') {
		cb = data
		data = undefined
	}

	stream.Writable.prototype.end.call(this, data, encoding, cb)
}

ClientRequest.prototype.flushHeaders = function () {}
ClientRequest.prototype.setTimeout = function () {}
ClientRequest.prototype.setNoDelay = function () {}
ClientRequest.prototype.setSocketKeepAlive = function () {}

// Taken from http://www.w3.org/TR/XMLHttpRequest/#the-setrequestheader%28%29-method
var unsafeHeaders = [
	'accept-charset',
	'accept-encoding',
	'access-control-request-headers',
	'access-control-request-method',
	'connection',
	'content-length',
	'cookie',
	'cookie2',
	'date',
	'dnt',
	'expect',
	'host',
	'keep-alive',
	'origin',
	'referer',
	'te',
	'trailer',
	'transfer-encoding',
	'upgrade',
	'via'
]
