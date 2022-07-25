"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDataReadable = void 0;
const buffer_1 = require("buffer");
async function* getDataReadable(data) {
    for await (const chunk of data) {
        yield buffer_1.Buffer.from(chunk);
    }
}
exports.getDataReadable = getDataReadable;
