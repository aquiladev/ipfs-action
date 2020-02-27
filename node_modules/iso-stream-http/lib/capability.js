function isFunction (value) {
	return typeof value === 'function'
}

module.exports = {
	fetch: 'fetch' in self && isFunction(self.fecth),
	writableStream: 'WritableStream' in self && isFunction(self.WritableStream),
	abortController: 'AbortController' in self && isFunction(self.AbortController),
	arrayBuffer: 'ArrayBuffer' in self
}