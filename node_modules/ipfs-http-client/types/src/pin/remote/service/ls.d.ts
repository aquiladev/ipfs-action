/**
 * @typedef {import('../../../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/pin/remote/service').API<HTTPClientExtraOptions>} RemotePiningServiceAPI
 */
/**
 * @param {import('../../../lib/core').Client} client
 */
export function createLs(client: import('../../../lib/core').Client): (options?: {}) => Promise<import("ipfs-core-types/src/pin/remote/service").RemotePinServiceWithStat[]>;
export type HTTPClientExtraOptions = import('../../../types').HTTPClientExtraOptions;
export type RemotePiningServiceAPI = import('ipfs-core-types/src/pin/remote/service').API<HTTPClientExtraOptions>;
//# sourceMappingURL=ls.d.ts.map