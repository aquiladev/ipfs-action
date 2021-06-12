declare function _exports(clientOptions: import("../types").Options): (options?: (import("ipfs-core-types/src/pin").LsOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/pin").LsResult>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type PinAPI = import('ipfs-core-types/src/pin').API<HTTPClientExtraOptions>;
//# sourceMappingURL=ls.d.ts.map