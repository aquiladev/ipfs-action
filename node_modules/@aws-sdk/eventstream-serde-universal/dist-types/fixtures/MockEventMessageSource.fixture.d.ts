/// <reference types="node" />
import { Readable, ReadableOptions } from "stream";
export interface MockEventMessageSourceOptions extends ReadableOptions {
    messages: Array<Buffer>;
    emitSize: number;
    throwError?: Error;
}
export declare class MockEventMessageSource extends Readable {
    private readonly data;
    private readonly emitSize;
    private readonly throwError?;
    private readCount;
    constructor(options: MockEventMessageSourceOptions);
    _read(): void;
}
