declare function _exports(clientOptions: import("./types").Options): (domain: string, options?: (import("ipfs-core-types/src/root").DNSOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<string>;
export = _exports;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=dns.d.ts.map