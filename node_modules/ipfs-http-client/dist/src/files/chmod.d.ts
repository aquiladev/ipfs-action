declare function _exports(clientOptions: import("../types").Options): (path: string, mode: string | number, options?: (import("ipfs-core-types/src/files").ChmodOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=chmod.d.ts.map