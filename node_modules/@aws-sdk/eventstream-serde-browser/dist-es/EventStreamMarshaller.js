import { EventStreamMarshaller as UniversalEventStreamMarshaller } from "@aws-sdk/eventstream-serde-universal";
import { iterableToReadableStream, readableStreamtoIterable } from "./utils";
var EventStreamMarshaller = (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.universalMarshaller = new UniversalEventStreamMarshaller({
            utf8Decoder: utf8Decoder,
            utf8Encoder: utf8Encoder,
        });
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        var bodyIterable = isReadableStream(body) ? readableStreamtoIterable(body) : body;
        return this.universalMarshaller.deserialize(bodyIterable, deserializer);
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var serialziedIterable = this.universalMarshaller.serialize(input, serializer);
        return typeof ReadableStream === "function" ? iterableToReadableStream(serialziedIterable) : serialziedIterable;
    };
    return EventStreamMarshaller;
}());
export { EventStreamMarshaller };
var isReadableStream = function (body) {
    return typeof ReadableStream === "function" && body instanceof ReadableStream;
};
