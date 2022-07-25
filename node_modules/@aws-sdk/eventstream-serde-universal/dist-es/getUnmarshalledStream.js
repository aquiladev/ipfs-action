import { __asyncGenerator, __asyncValues, __await, __generator } from "tslib";
export function getUnmarshalledStream(source, options) {
    var _a;
    return _a = {},
        _a[Symbol.asyncIterator] = function () {
            return __asyncGenerator(this, arguments, function () {
                var source_1, source_1_1, chunk, message, messageType, unmodeledError, code, exception, deserializedException, error, event_1, deserialized, e_1_1;
                var _a, _b;
                var e_1, _c;
                return __generator(this, function (_d) {
                    switch (_d.label) {
                        case 0:
                            _d.trys.push([0, 12, 13, 18]);
                            source_1 = __asyncValues(source);
                            _d.label = 1;
                        case 1: return [4, __await(source_1.next())];
                        case 2:
                            if (!(source_1_1 = _d.sent(), !source_1_1.done)) return [3, 11];
                            chunk = source_1_1.value;
                            message = options.eventStreamCodec.decode(chunk);
                            messageType = message.headers[":message-type"].value;
                            if (!(messageType === "error")) return [3, 3];
                            unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
                            unmodeledError.name = message.headers[":error-code"].value;
                            throw unmodeledError;
                        case 3:
                            if (!(messageType === "exception")) return [3, 5];
                            code = message.headers[":exception-type"].value;
                            exception = (_a = {}, _a[code] = message, _a);
                            return [4, __await(options.deserializer(exception))];
                        case 4:
                            deserializedException = _d.sent();
                            if (deserializedException.$unknown) {
                                error = new Error(options.toUtf8(message.body));
                                error.name = code;
                                throw error;
                            }
                            throw deserializedException[code];
                        case 5:
                            if (!(messageType === "event")) return [3, 9];
                            event_1 = (_b = {},
                                _b[message.headers[":event-type"].value] = message,
                                _b);
                            return [4, __await(options.deserializer(event_1))];
                        case 6:
                            deserialized = _d.sent();
                            if (deserialized.$unknown)
                                return [3, 10];
                            return [4, __await(deserialized)];
                        case 7: return [4, _d.sent()];
                        case 8:
                            _d.sent();
                            return [3, 10];
                        case 9: throw Error("Unrecognizable event type: ".concat(message.headers[":event-type"].value));
                        case 10: return [3, 1];
                        case 11: return [3, 18];
                        case 12:
                            e_1_1 = _d.sent();
                            e_1 = { error: e_1_1 };
                            return [3, 18];
                        case 13:
                            _d.trys.push([13, , 16, 17]);
                            if (!(source_1_1 && !source_1_1.done && (_c = source_1.return))) return [3, 15];
                            return [4, __await(_c.call(source_1))];
                        case 14:
                            _d.sent();
                            _d.label = 15;
                        case 15: return [3, 17];
                        case 16:
                            if (e_1) throw e_1.error;
                            return [7];
                        case 17: return [7];
                        case 18: return [2];
                    }
                });
            });
        },
        _a;
}
