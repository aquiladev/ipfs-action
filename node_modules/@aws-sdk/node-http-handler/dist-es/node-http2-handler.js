import { __assign, __awaiter, __generator, __values } from "tslib";
import { HttpResponse } from "@aws-sdk/protocol-http";
import { buildQueryString } from "@aws-sdk/querystring-builder";
import { connect, constants } from "http2";
import { getTransformedHeaders } from "./get-transformed-headers";
import { writeRequestBody } from "./write-request-body";
var NodeHttp2Handler = (function () {
    function NodeHttp2Handler(options) {
        this.metadata = { handlerProtocol: "h2" };
        this.configProvider = new Promise(function (resolve, reject) {
            if (typeof options === "function") {
                options()
                    .then(function (opts) {
                    resolve(opts || {});
                })
                    .catch(reject);
            }
            else {
                resolve(options || {});
            }
        });
        this.sessionCache = new Map();
    }
    NodeHttp2Handler.prototype.destroy = function () {
        var e_1, _a;
        var _this = this;
        try {
            for (var _b = __values(this.sessionCache.values()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var sessions = _c.value;
                sessions.forEach(function (session) { return _this.destroySession(session); });
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        this.sessionCache.clear();
    };
    NodeHttp2Handler.prototype.handle = function (request, _a) {
        var _b = _a === void 0 ? {} : _a, abortSignal = _b.abortSignal;
        return __awaiter(this, void 0, void 0, function () {
            var _c, _d, requestTimeout, disableConcurrentStreams;
            var _this = this;
            return __generator(this, function (_e) {
                switch (_e.label) {
                    case 0:
                        if (!!this.config) return [3, 2];
                        _c = this;
                        return [4, this.configProvider];
                    case 1:
                        _c.config = _e.sent();
                        _e.label = 2;
                    case 2:
                        _d = this.config, requestTimeout = _d.requestTimeout, disableConcurrentStreams = _d.disableConcurrentStreams;
                        return [2, new Promise(function (resolve, rejectOriginal) {
                                var _a;
                                var fulfilled = false;
                                if (abortSignal === null || abortSignal === void 0 ? void 0 : abortSignal.aborted) {
                                    fulfilled = true;
                                    var abortError = new Error("Request aborted");
                                    abortError.name = "AbortError";
                                    rejectOriginal(abortError);
                                    return;
                                }
                                var hostname = request.hostname, method = request.method, port = request.port, protocol = request.protocol, path = request.path, query = request.query;
                                var authority = "".concat(protocol, "//").concat(hostname).concat(port ? ":".concat(port) : "");
                                var session = _this.getSession(authority, disableConcurrentStreams || false);
                                var reject = function (err) {
                                    if (disableConcurrentStreams) {
                                        _this.destroySession(session);
                                    }
                                    fulfilled = true;
                                    rejectOriginal(err);
                                };
                                var queryString = buildQueryString(query || {});
                                var req = session.request(__assign(__assign({}, request.headers), (_a = {}, _a[constants.HTTP2_HEADER_PATH] = queryString ? "".concat(path, "?").concat(queryString) : path, _a[constants.HTTP2_HEADER_METHOD] = method, _a)));
                                session.ref();
                                req.on("response", function (headers) {
                                    var httpResponse = new HttpResponse({
                                        statusCode: headers[":status"] || -1,
                                        headers: getTransformedHeaders(headers),
                                        body: req,
                                    });
                                    fulfilled = true;
                                    resolve({ response: httpResponse });
                                    if (disableConcurrentStreams) {
                                        session.close();
                                        _this.deleteSessionFromCache(authority, session);
                                    }
                                });
                                if (requestTimeout) {
                                    req.setTimeout(requestTimeout, function () {
                                        req.close();
                                        var timeoutError = new Error("Stream timed out because of no activity for ".concat(requestTimeout, " ms"));
                                        timeoutError.name = "TimeoutError";
                                        reject(timeoutError);
                                    });
                                }
                                if (abortSignal) {
                                    abortSignal.onabort = function () {
                                        req.close();
                                        var abortError = new Error("Request aborted");
                                        abortError.name = "AbortError";
                                        reject(abortError);
                                    };
                                }
                                req.on("frameError", function (type, code, id) {
                                    reject(new Error("Frame type id ".concat(type, " in stream id ").concat(id, " has failed with code ").concat(code, ".")));
                                });
                                req.on("error", reject);
                                req.on("aborted", function () {
                                    reject(new Error("HTTP/2 stream is abnormally aborted in mid-communication with result code ".concat(req.rstCode, ".")));
                                });
                                req.on("close", function () {
                                    session.unref();
                                    if (disableConcurrentStreams) {
                                        session.destroy();
                                    }
                                    if (!fulfilled) {
                                        reject(new Error("Unexpected error: http2 request did not get a response"));
                                    }
                                });
                                writeRequestBody(req, request);
                            })];
                }
            });
        });
    };
    NodeHttp2Handler.prototype.getSession = function (authority, disableConcurrentStreams) {
        var _this = this;
        var _a;
        var sessionCache = this.sessionCache;
        var existingSessions = sessionCache.get(authority) || [];
        if (existingSessions.length > 0 && !disableConcurrentStreams)
            return existingSessions[0];
        var newSession = connect(authority);
        newSession.unref();
        var destroySessionCb = function () {
            _this.destroySession(newSession);
            _this.deleteSessionFromCache(authority, newSession);
        };
        newSession.on("goaway", destroySessionCb);
        newSession.on("error", destroySessionCb);
        newSession.on("frameError", destroySessionCb);
        newSession.on("close", function () { return _this.deleteSessionFromCache(authority, newSession); });
        if ((_a = this.config) === null || _a === void 0 ? void 0 : _a.sessionTimeout) {
            newSession.setTimeout(this.config.sessionTimeout, destroySessionCb);
        }
        existingSessions.push(newSession);
        sessionCache.set(authority, existingSessions);
        return newSession;
    };
    NodeHttp2Handler.prototype.destroySession = function (session) {
        if (!session.destroyed) {
            session.destroy();
        }
    };
    NodeHttp2Handler.prototype.deleteSessionFromCache = function (authority, session) {
        var existingSessions = this.sessionCache.get(authority) || [];
        if (!existingSessions.includes(session)) {
            return;
        }
        this.sessionCache.set(authority, existingSessions.filter(function (s) { return s !== session; }));
    };
    return NodeHttp2Handler;
}());
export { NodeHttp2Handler };
