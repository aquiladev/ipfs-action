import { __asyncGenerator, __await, __awaiter, __generator } from "tslib";
export var readableStreamtoIterable = function (readableStream) {
    var _a;
    return (_a = {},
        _a[Symbol.asyncIterator] = function () {
            return __asyncGenerator(this, arguments, function () {
                var reader, _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            reader = readableStream.getReader();
                            _b.label = 1;
                        case 1:
                            _b.trys.push([1, , 9, 10]);
                            _b.label = 2;
                        case 2:
                            if (!true) return [3, 8];
                            return [4, __await(reader.read())];
                        case 3:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (!done) return [3, 5];
                            return [4, __await(void 0)];
                        case 4: return [2, _b.sent()];
                        case 5: return [4, __await(value)];
                        case 6: return [4, _b.sent()];
                        case 7:
                            _b.sent();
                            return [3, 2];
                        case 8: return [3, 10];
                        case 9:
                            reader.releaseLock();
                            return [7];
                        case 10: return [2];
                    }
                });
            });
        },
        _a);
};
export var iterableToReadableStream = function (asyncIterable) {
    var iterator = asyncIterable[Symbol.asyncIterator]();
    return new ReadableStream({
        pull: function (controller) {
            return __awaiter(this, void 0, void 0, function () {
                var _a, done, value;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, iterator.next()];
                        case 1:
                            _a = _b.sent(), done = _a.done, value = _a.value;
                            if (done) {
                                return [2, controller.close()];
                            }
                            controller.enqueue(value);
                            return [2];
                    }
                });
            });
        },
    });
};
