declare function _exports(clientOptions: import("../types").Options): (options?: (import("ipfs-core-types/src/swarm").PeersOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/swarm").PeersResult[]>;
export = _exports;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type SwarmAPI = import('ipfs-core-types/src/swarm').API<HTTPClientExtraOptions>;
//# sourceMappingURL=peers.d.ts.map