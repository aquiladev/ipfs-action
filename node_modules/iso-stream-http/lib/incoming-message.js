var capability = require('./capability')
var inherits = require('inherits')
var stream = require('readable-stream')

var IncomingMessage = function (response, mode, fetchTimer) {
	stream.Readable.call(this)

	this._mode = mode
	this.headers = {}
	this.rawHeaders = []
	this.trailers = {}
	this.rawTrailers = []

	// Fake the 'close' event, but only once 'end' fires
	this.on('end',  () => {
		// The nextTick is necessary to prevent the 'request' module from causing an infinite loop
		process.nextTick(() =>this.emit('close'))
	})

	this._fetchResponse = response

	this.url = response.url
	this.statusCode = response.status
	this.statusMessage = response.statusText
	
	response.headers.forEach((header, key) => {
		this.headers[key.toLowerCase()] = header
		this.rawHeaders.push(key, header)
	})

	if (capability.writableStream) {
		var writable = new WritableStream({
			write: chunk => {
				return new Promise((resolve, reject) => {
					if (this._destroyed) {
						reject()
					} else if(this.push(Buffer.from(chunk))) {
						resolve()
					} else {
						this._resumeFetch = resolve
					}
				})
			},
			close: () => {
				clearTimeout(fetchTimer)
				if (!this._destroyed){
					this.push(null)
				}
			},
			abort: err => {
				if (!this._destroyed){
					this.emit('error', err)
				}
			}
		})

		try {
			response.body
				.pipeTo(writable)
				.catch(err => {
					console.log(err);
					self.clearTimeout(fetchTimer)
					if (!this._destroyed){
						this.emit('error', err)
					}
				})
			return
		} catch (e) {} // pipeTo method isn't defined. Can't find a better way to feature test this
	}
	// fallback for when writableStream or pipeTo aren't available
	var reader = response.body.getReader()
	
	function read (context) {
		reader.read()
		.then(result => {
			if (context._destroyed){
				return
			}
			if (result.done) {
				clearTimeout(fetchTimer)
				context.push(null)
				return
			}
			context.push(Buffer.from(result.value))
			read(context)
		})
		.catch(err => {
			clearTimeout(fetchTimer)
			if (!context._destroyed){
				context.emit('error', err)
			}
		})
	}

	read(this)
	
}

inherits(IncomingMessage, stream.Readable)

IncomingMessage.prototype._read = function () {
	var resolve = this._resumeFetch
	if (resolve) {
		this._resumeFetch = null
		resolve()
	}
}

module.exports = IncomingMessage