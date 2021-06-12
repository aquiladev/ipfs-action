declare function _exports(clientOptions: import("../types").Options): (name: string, options?: (import("ipfs-core-types/src/key").GenOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/key").Key>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type KeyAPI = import('ipfs-core-types/src/key').API<HTTPClientExtraOptions>;
//# sourceMappingURL=gen.d.ts.map