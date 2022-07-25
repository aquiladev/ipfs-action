"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStreamMarshaller = void 0;
const eventstream_serde_universal_1 = require("@aws-sdk/eventstream-serde-universal");
const stream_1 = require("stream");
const utils_1 = require("./utils");
class EventStreamMarshaller {
    constructor({ utf8Encoder, utf8Decoder }) {
        this.universalMarshaller = new eventstream_serde_universal_1.EventStreamMarshaller({
            utf8Decoder,
            utf8Encoder,
        });
    }
    deserialize(body, deserializer) {
        const bodyIterable = typeof body[Symbol.asyncIterator] === "function" ? body : (0, utils_1.readabletoIterable)(body);
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    }
    serialize(input, serializer) {
        const serializedIterable = this.universalMarshaller.serialize(input, serializer);
        if (typeof stream_1.Readable.from === "function") {
            return stream_1.Readable.from(serializedIterable);
        }
        else {
            const iterator = serializedIterable[Symbol.asyncIterator]();
            const serializedStream = new stream_1.Readable({
                autoDestroy: true,
                objectMode: true,
                async read() {
                    iterator
                        .next()
                        .then(({ done, value }) => {
                        if (done) {
                            this.push(null);
                        }
                        else {
                            this.push(value);
                        }
                    })
                        .catch((err) => {
                        this.destroy(err);
                    });
                },
            });
            serializedStream.on("error", () => {
                serializedStream.destroy();
            });
            serializedStream.on("end", () => {
                serializedStream.destroy();
            });
            return serializedStream;
        }
    }
}
exports.EventStreamMarshaller = EventStreamMarshaller;
