"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChunk = void 0;
const buffer_1 = require("buffer");
const stream_1 = require("stream");
const getChunkBuffer_1 = require("./chunks/getChunkBuffer");
const getChunkStream_1 = require("./chunks/getChunkStream");
const getDataReadable_1 = require("./chunks/getDataReadable");
const getDataReadableStream_1 = require("./chunks/getDataReadableStream");
const getChunk = (data, partSize) => {
    if (data instanceof buffer_1.Buffer) {
        return (0, getChunkBuffer_1.getChunkBuffer)(data, partSize);
    }
    else if (data instanceof stream_1.Readable) {
        return (0, getChunkStream_1.getChunkStream)(data, partSize, getDataReadable_1.getDataReadable);
    }
    else if (data instanceof String || typeof data === "string" || data instanceof Uint8Array) {
        return (0, getChunkBuffer_1.getChunkBuffer)(buffer_1.Buffer.from(data), partSize);
    }
    if (typeof data.stream === "function") {
        return (0, getChunkStream_1.getChunkStream)(data.stream(), partSize, getDataReadableStream_1.getDataReadableStream);
    }
    else if (data instanceof ReadableStream) {
        return (0, getChunkStream_1.getChunkStream)(data, partSize, getDataReadableStream_1.getDataReadableStream);
    }
    else {
        throw new Error("Body Data is unsupported format, expected data to be one of: string | Uint8Array | Buffer | Readable | ReadableStream | Blob;.");
    }
};
exports.getChunk = getChunk;
