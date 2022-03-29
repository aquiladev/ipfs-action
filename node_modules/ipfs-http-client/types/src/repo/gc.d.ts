/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/repo').API<HTTPClientExtraOptions>} RepoAPI
 */
export const createGc: import("../lib/configure.js").Factory<(options?: (import("ipfs-core-types/src/repo").GCOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/repo").GCResult>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type RepoAPI = import('ipfs-core-types/src/repo').API<HTTPClientExtraOptions>;
//# sourceMappingURL=gc.d.ts.map