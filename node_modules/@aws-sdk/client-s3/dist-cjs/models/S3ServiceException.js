"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3ServiceException = void 0;
const smithy_client_1 = require("@aws-sdk/smithy-client");
class S3ServiceException extends smithy_client_1.ServiceException {
    constructor(options) {
        super(options);
        Object.setPrototypeOf(this, S3ServiceException.prototype);
    }
}
exports.S3ServiceException = S3ServiceException;
