declare function _exports(clientOptions: import("../types").Options): (sources: import("ipfs-core-types/src/utils").IPFSPath | import("ipfs-core-types/src/utils").IPFSPath[], destination: string, options?: (import("ipfs-core-types/src/files").CpOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=cp.d.ts.map