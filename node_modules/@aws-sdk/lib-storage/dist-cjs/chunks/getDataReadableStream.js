"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataReadableStream = void 0;
const buffer_1 = require("buffer");
async function* getDataReadableStream(data) {
    const reader = data.getReader();
    try {
        while (true) {
            const { done, value } = await reader.read();
            if (done)
                return;
            yield buffer_1.Buffer.from(value);
        }
    }
    catch (e) {
        throw e;
    }
    finally {
        reader.releaseLock();
    }
}
exports.getDataReadableStream = getDataReadableStream;
