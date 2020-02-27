'use strict';

const { Duplex } = require('readable-stream');

class PullDuplexStream extends Duplex {
    constructor(source, sink, options) {
        super(options);
        this.source = source;
        this.drainingSource = false;
        this.sink = sink;
        this.input = [];
        this.writeCallbacks = [];
        this.internalSourceCallbacks = [];
        if (this.sink) {
            this.sink(this._internalSource.bind(this));
        }
    }

    drainPull() {
        const self = this;

        this.drainingSource = true;
        this.source(null, function next(end, data) {
            if (end instanceof Error) {
                return self.emit('error', end);
            }

            if (end) {
                return self.push(null);
            }

            if (self.push(data)) {
                self.source(null, next);
            } else {
                self.drainingSource = false;
            }
        });
    }

    _read() {
        if (this.source && !this.drainingSource) {
            this.drainPull();
        }
    }

    _write(chunk, encoding, callback) {
        if (this.internalSourceCallbacks.length > 0) {
            this.internalSourceCallbacks.shift()(null, chunk);
            callback();
        } else {
            this.input.push(chunk);
            this.writeCallbacks.push(callback);
        }
    }

    _internalSource(end, cb) {
        if (end) {
            if (this.writeCallbacks.length > 0) {
                // call write callback with error
                this.writeCallbacks.shift()(
                    end instanceof Error ? end : new Error('Aborted')
                );
            }

            return cb(end);
        }

        if (this.input.length > 0) {
            cb(null, this.input.shift());
            this.writeCallbacks.shift()();
        } else {
            this.internalSourceCallbacks.push(cb);
        }
    }

    _final(callback) {
        // end the internal source
        if (this.internalSourceCallbacks.length > 0) {
            this.internalSourceCallbacks.shift()(true);
        }
        callback();
    }
    _destroy(err, cb) {
        // abort the source
        if (!this._readableState.ended && this.source) {
            this.source(true, () => {
                // do nothing
            });
        }

        // propagate error to sink
        if (this.internalSourceCallbacks.length > 0) {
            this.internalSourceCallbacks.shift()(err);
        }

        cb(err);
    }
}

function wrapper(source, sink, options) {
    if (source && typeof source === 'object') {
        source = source.source;
        sink = source.sink;
    }

    return new PullDuplexStream(
        source,
        sink,
        Object.assign(
            {
                readableObjectMode: true,
                writableObjectMode: true
            },
            options
        )
    );
}

module.exports = {
    duplex: wrapper,
    readable: (source, options) => wrapper(source, null, options),
    writeable: (sink, options) => wrapper(null, sink, options)
};
