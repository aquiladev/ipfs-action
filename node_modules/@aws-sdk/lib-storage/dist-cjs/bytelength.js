"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.byteLength = void 0;
const runtimeConfig_1 = require("./runtimeConfig");
const byteLength = (input) => {
    if (input === null || input === undefined)
        return 0;
    if (typeof input === "string")
        input = Buffer.from(input);
    if (typeof input.byteLength === "number") {
        return input.byteLength;
    }
    else if (typeof input.length === "number") {
        return input.length;
    }
    else if (typeof input.size === "number") {
        return input.size;
    }
    else if (typeof input.path === "string") {
        try {
            return runtimeConfig_1.ClientDefaultValues.lstatSync(input.path).size;
        }
        catch (error) {
            return undefined;
        }
    }
    return undefined;
};
exports.byteLength = byteLength;
