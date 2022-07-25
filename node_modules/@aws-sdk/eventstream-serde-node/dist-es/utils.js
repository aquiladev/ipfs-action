import { __asyncGenerator, __await, __generator } from "tslib";
export function readabletoIterable(readStream) {
    return __asyncGenerator(this, arguments, function readabletoIterable_1() {
        var streamEnded, generationEnded, records, value;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    streamEnded = false;
                    generationEnded = false;
                    records = new Array();
                    readStream.on("error", function (err) {
                        if (!streamEnded) {
                            streamEnded = true;
                        }
                        if (err) {
                            throw err;
                        }
                    });
                    readStream.on("data", function (data) {
                        records.push(data);
                    });
                    readStream.on("end", function () {
                        streamEnded = true;
                    });
                    _a.label = 1;
                case 1:
                    if (!!generationEnded) return [3, 6];
                    return [4, __await(new Promise(function (resolve) { return setTimeout(function () { return resolve(records.shift()); }, 0); }))];
                case 2:
                    value = _a.sent();
                    if (!value) return [3, 5];
                    return [4, __await(value)];
                case 3: return [4, _a.sent()];
                case 4:
                    _a.sent();
                    _a.label = 5;
                case 5:
                    generationEnded = streamEnded && records.length === 0;
                    return [3, 1];
                case 6: return [2];
            }
        });
    });
}
