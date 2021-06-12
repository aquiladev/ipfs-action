declare function _exports(clientOptions: import("../types").Options): (ipfsPath: import("ipfs-core-types/src/utils").IPFSPath, options?: (import("ipfs-core-types/src/dag").ResolveOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/dag").ResolveResult>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type DAGAPI = import('ipfs-core-types/src/dag').API<HTTPClientExtraOptions>;
//# sourceMappingURL=resolve.d.ts.map