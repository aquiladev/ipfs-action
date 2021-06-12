declare function _exports(clientOptions: import("../types").Options): (path: string, input: string | Blob | Uint8Array | Iterable<Uint8Array> | AsyncIterable<Uint8Array>, options?: (import("ipfs-core-types/src/files").WriteOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=write.d.ts.map