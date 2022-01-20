/**
 * @typedef {import('ipfs-core-types/src/pin/remote/service').RemotePinServiceWithStat} RemotePinServiceWithStat
 */
/**
 * @param {URL} url
 */
export function encodeEndpoint(url: URL): string;
/**
 * @param {any} json
 * @returns {RemotePinServiceWithStat}
 */
export function decodeRemoteService(json: any): RemotePinServiceWithStat;
/**
 * @param {any} json
 * @returns {import('ipfs-core-types/src/pin/remote/service').Stat}
 */
export function decodeStat(json: any): import('ipfs-core-types/src/pin/remote/service').Stat;
export type RemotePinServiceWithStat = import('ipfs-core-types/src/pin/remote/service').RemotePinServiceWithStat;
//# sourceMappingURL=utils.d.ts.map