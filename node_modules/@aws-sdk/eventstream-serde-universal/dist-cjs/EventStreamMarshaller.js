"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventStreamMarshaller = void 0;
const eventstream_codec_1 = require("@aws-sdk/eventstream-codec");
const getChunkedStream_1 = require("./getChunkedStream");
const getUnmarshalledStream_1 = require("./getUnmarshalledStream");
class EventStreamMarshaller {
    constructor({ utf8Encoder, utf8Decoder }) {
        this.eventStreamCodec = new eventstream_codec_1.EventStreamCodec(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
    }
    deserialize(body, deserializer) {
        const chunkedStream = (0, getChunkedStream_1.getChunkedStream)(body);
        const unmarshalledStream = (0, getUnmarshalledStream_1.getUnmarshalledStream)(chunkedStream, {
            eventStreamCodec: this.eventStreamCodec,
            deserializer,
            toUtf8: this.utfEncoder,
        });
        return unmarshalledStream;
    }
    serialize(input, serializer) {
        const self = this;
        const serializedIterator = async function* () {
            for await (const chunk of input) {
                const payloadBuf = self.eventStreamCodec.encode(serializer(chunk));
                yield payloadBuf;
            }
            yield new Uint8Array(0);
        };
        return {
            [Symbol.asyncIterator]: serializedIterator,
        };
    }
}
exports.EventStreamMarshaller = EventStreamMarshaller;
