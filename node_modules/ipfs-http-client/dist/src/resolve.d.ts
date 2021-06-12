declare function _exports(clientOptions: import("./types").Options): (path: string, options?: (import("ipfs-core-types/src/root").ResolveOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<string>;
export = _exports;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=resolve.d.ts.map