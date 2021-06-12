declare function _exports(clientOptions: import("./types").Options): (peerId: string, options?: (import("ipfs-core-types/src/root").PingOptions & import("./types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/root").PingResult>;
export = _exports;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=ping.d.ts.map