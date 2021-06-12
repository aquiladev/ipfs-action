declare function _exports(options: import('./types').Options): (input: import("ipfs-core-types/src/utils").ImportCandidate, options?: (import("ipfs-core-types/src/root").AddOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/root").AddResult>;
export = _exports;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=add.d.ts.map