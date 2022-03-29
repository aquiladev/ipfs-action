/**
 * @typedef {import('./types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>} RootAPI
 */
export const createId: import("./lib/configure.js").Factory<(options?: (import("ipfs-core-types/src/root").IDOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/root").IDResult>>;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=id.d.ts.map