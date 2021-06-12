declare function _exports(clientOptions: import("../types").Options): (path: string, options?: (import("ipfs-core-types/src/name").ResolveOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<string>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type NameAPI = import('ipfs-core-types/src/name').API<HTTPClientExtraOptions>;
//# sourceMappingURL=resolve.d.ts.map