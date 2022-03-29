/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/refs').API<HTTPClientExtraOptions>} RefsAPI
 */
export const createRefs: import("../lib/configure.js").Factory<import("ipfs-core-types/src/refs").Refs<import("../types").HTTPClientExtraOptions> & {
    local: (options?: (import("ipfs-core-types/src/utils").AbortOptions & import("../types").HTTPClientExtraOptions) | undefined) => AsyncIterable<import("ipfs-core-types/src/refs").RefsResult>;
}>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type RefsAPI = import('ipfs-core-types/src/refs').API<HTTPClientExtraOptions>;
//# sourceMappingURL=index.d.ts.map