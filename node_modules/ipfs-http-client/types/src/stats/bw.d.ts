/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/stats').API<HTTPClientExtraOptions>} StatsAPI
 */
export const createBw: import("../lib/configure.js").Factory<(options?: (import("ipfs-core-types/src/stats").BWOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/stats").BWResult>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type StatsAPI = import('ipfs-core-types/src/stats').API<HTTPClientExtraOptions>;
//# sourceMappingURL=bw.d.ts.map