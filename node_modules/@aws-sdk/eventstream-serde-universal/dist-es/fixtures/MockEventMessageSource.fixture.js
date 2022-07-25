import { __extends } from "tslib";
import { Readable } from "stream";
var MockEventMessageSource = (function (_super) {
    __extends(MockEventMessageSource, _super);
    function MockEventMessageSource(options) {
        var _this = _super.call(this, options) || this;
        _this.readCount = 0;
        _this.data = Buffer.concat(options.messages);
        _this.emitSize = options.emitSize;
        _this.throwError = options.throwError;
        return _this;
    }
    MockEventMessageSource.prototype._read = function () {
        var self = this;
        if (this.readCount === this.data.length) {
            if (this.throwError) {
                process.nextTick(function () {
                    self.emit("error", new Error("Throwing an error!"));
                });
                return;
            }
            else {
                this.push(null);
                return;
            }
        }
        var bytesLeft = this.data.length - this.readCount;
        var numBytesToSend = Math.min(bytesLeft, this.emitSize);
        var chunk = this.data.slice(this.readCount, this.readCount + numBytesToSend);
        this.readCount += numBytesToSend;
        this.push(chunk);
    };
    return MockEventMessageSource;
}(Readable));
export { MockEventMessageSource };
