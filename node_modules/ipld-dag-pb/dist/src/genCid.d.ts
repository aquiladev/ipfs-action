/**
 * - Options to create the CID
 */
export type GenCIDOptions = {
    /**
     * - CID version number
     */
    cidVersion?: CID.CIDVersion | undefined;
    /**
     * - Defaults to the defaultHashAlg of the format
     */
    hashAlg?: multihashing.multihash.HashCode | undefined;
};
export const codec: import("multicodec/src/generated-types").CodecCode;
export const defaultHashAlg: import("multihashes/dist/src/constants").HashCode;
/**
 * @typedef {object} GenCIDOptions - Options to create the CID
 * @property {CID.CIDVersion} [cidVersion=1] - CID version number
 * @property {multihashing.multihash.HashCode} [hashAlg=multihash.names['sha2-256']] - Defaults to the defaultHashAlg of the format
 */
/**
 * Calculate the CID of the binary blob.
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {GenCIDOptions} [userOptions] - Options to create the CID
 */
export function cid(binaryBlob: Uint8Array, userOptions?: GenCIDOptions | undefined): Promise<CID>;
import CID = require("cids");
import multihashing = require("multihashing-async");
//# sourceMappingURL=genCid.d.ts.map