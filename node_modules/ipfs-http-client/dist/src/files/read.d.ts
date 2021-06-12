declare function _exports(clientOptions: import("../types").Options): (path: import("ipfs-core-types/src/utils").IPFSPath, options?: (import("ipfs-core-types/src/files").ReadOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<Uint8Array>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=read.d.ts.map