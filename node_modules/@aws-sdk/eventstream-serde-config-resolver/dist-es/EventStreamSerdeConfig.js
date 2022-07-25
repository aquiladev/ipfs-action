import { __assign } from "tslib";
export var resolveEventStreamSerdeConfig = function (input) { return (__assign(__assign({}, input), { eventStreamMarshaller: input.eventStreamSerdeProvider(input) })); };
