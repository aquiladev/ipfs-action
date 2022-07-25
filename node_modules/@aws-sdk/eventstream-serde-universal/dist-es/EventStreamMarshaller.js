import { __asyncGenerator, __asyncValues, __await, __generator } from "tslib";
import { EventStreamCodec } from "@aws-sdk/eventstream-codec";
import { getChunkedStream } from "./getChunkedStream";
import { getUnmarshalledStream } from "./getUnmarshalledStream";
var EventStreamMarshaller = (function () {
    function EventStreamMarshaller(_a) {
        var utf8Encoder = _a.utf8Encoder, utf8Decoder = _a.utf8Decoder;
        this.eventStreamCodec = new EventStreamCodec(utf8Encoder, utf8Decoder);
        this.utfEncoder = utf8Encoder;
    }
    EventStreamMarshaller.prototype.deserialize = function (body, deserializer) {
        var chunkedStream = getChunkedStream(body);
        var unmarshalledStream = getUnmarshalledStream(chunkedStream, {
            eventStreamCodec: this.eventStreamCodec,
            deserializer: deserializer,
            toUtf8: this.utfEncoder,
        });
        return unmarshalledStream;
    };
    EventStreamMarshaller.prototype.serialize = function (input, serializer) {
        var _a;
        var self = this;
        var serializedIterator = function () {
            return __asyncGenerator(this, arguments, function () {
                var input_1, input_1_1, chunk, payloadBuf, e_1_1;
                var e_1, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 7, 8, 13]);
                            input_1 = __asyncValues(input);
                            _b.label = 1;
                        case 1: return [4, __await(input_1.next())];
                        case 2:
                            if (!(input_1_1 = _b.sent(), !input_1_1.done)) return [3, 6];
                            chunk = input_1_1.value;
                            payloadBuf = self.eventStreamCodec.encode(serializer(chunk));
                            return [4, __await(payloadBuf)];
                        case 3: return [4, _b.sent()];
                        case 4:
                            _b.sent();
                            _b.label = 5;
                        case 5: return [3, 1];
                        case 6: return [3, 13];
                        case 7:
                            e_1_1 = _b.sent();
                            e_1 = { error: e_1_1 };
                            return [3, 13];
                        case 8:
                            _b.trys.push([8, , 11, 12]);
                            if (!(input_1_1 && !input_1_1.done && (_a = input_1.return))) return [3, 10];
                            return [4, __await(_a.call(input_1))];
                        case 9:
                            _b.sent();
                            _b.label = 10;
                        case 10: return [3, 12];
                        case 11:
                            if (e_1) throw e_1.error;
                            return [7];
                        case 12: return [7];
                        case 13: return [4, __await(new Uint8Array(0))];
                        case 14: return [4, _b.sent()];
                        case 15:
                            _b.sent();
                            return [2];
                    }
                });
            });
        };
        return _a = {},
            _a[Symbol.asyncIterator] = serializedIterator,
            _a;
    };
    return EventStreamMarshaller;
}());
export { EventStreamMarshaller };
