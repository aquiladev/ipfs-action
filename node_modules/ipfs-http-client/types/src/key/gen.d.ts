/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/key').API<HTTPClientExtraOptions>} KeyAPI
 */
export const createGen: import("../lib/configure.js").Factory<(name: string, options?: (import("ipfs-core-types/src/key").GenOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/key").Key>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type KeyAPI = import('ipfs-core-types/src/key').API<HTTPClientExtraOptions>;
//# sourceMappingURL=gen.d.ts.map