/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/swarm').API<HTTPClientExtraOptions>} SwarmAPI
 */
export const createPeers: import("../lib/configure.js").Factory<(options?: (import("ipfs-core-types/src/swarm").PeersOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/swarm").PeersResult[]>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type SwarmAPI = import('ipfs-core-types/src/swarm').API<HTTPClientExtraOptions>;
//# sourceMappingURL=peers.d.ts.map