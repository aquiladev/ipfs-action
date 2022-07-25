import { __assign, __awaiter, __generator } from "tslib";
import { HttpRequest } from "@aws-sdk/protocol-http";
var TRACE_ID_HEADER_NAME = "X-Amzn-Trace-Id";
var ENV_LAMBDA_FUNCTION_NAME = "AWS_LAMBDA_FUNCTION_NAME";
var ENV_TRACE_ID = "_X_AMZN_TRACE_ID";
export var recursionDetectionMiddleware = function (options) {
    return function (next) {
        return function (args) { return __awaiter(void 0, void 0, void 0, function () {
            var request, functionName, traceId, nonEmptyString;
            return __generator(this, function (_a) {
                request = args.request;
                if (!HttpRequest.isInstance(request) ||
                    options.runtime !== "node" ||
                    request.headers.hasOwnProperty(TRACE_ID_HEADER_NAME)) {
                    return [2, next(args)];
                }
                functionName = process.env[ENV_LAMBDA_FUNCTION_NAME];
                traceId = process.env[ENV_TRACE_ID];
                nonEmptyString = function (str) { return typeof str === "string" && str.length > 0; };
                if (nonEmptyString(functionName) && nonEmptyString(traceId)) {
                    request.headers[TRACE_ID_HEADER_NAME] = traceId;
                }
                return [2, next(__assign(__assign({}, args), { request: request }))];
            });
        }); };
    };
};
export var addRecursionDetectionMiddlewareOptions = {
    step: "build",
    tags: ["RECURSION_DETECTION"],
    name: "recursionDetectionMiddleware",
    override: true,
    priority: "low",
};
export var getRecursionDetectionPlugin = function (options) { return ({
    applyToStack: function (clientStack) {
        clientStack.add(recursionDetectionMiddleware(options), addRecursionDetectionMiddlewareOptions);
    },
}); };
