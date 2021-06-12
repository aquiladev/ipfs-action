export type DAGLinkLike = import('./types').DAGLinkLike;
/**
 * Serialize internal representation into a binary PB block
 *
 * @param {DAGNode | { Data?: Uint8Array, Links?: (DAGLink | DAGLinkLike)[]}} node
 */
export function serialize(node: DAGNode | {
    Data?: Uint8Array;
    Links?: (DAGLink | DAGLinkLike)[];
}): Uint8Array;
/**
 * Deserialize PB block into the internal representation.
 *
 * @param {Uint8Array} buffer - Binary representation of a PB block
 */
export function deserialize(buffer: Uint8Array): DAGNode;
/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 */
/**
 * Calculate the CID of the binary blob
 *
 * @param {Uint8Array} binaryBlob - Encoded IPLD Node
 * @param {import('./genCid').GenCIDOptions} [userOptions] - Options to create the CID
 */
export function cid(binaryBlob: Uint8Array, userOptions?: genCid.GenCIDOptions | undefined): Promise<import("cids")>;
import DAGNode = require("./dag-node/dagNode");
import DAGLink = require("./dag-link/dagLink");
import genCid = require("./genCid");
export declare const codec: import("multicodec/src/generated-types").CodecCode;
export declare const defaultHashAlg: import("multihashes/dist/src/constants").HashCode;
//# sourceMappingURL=util.d.ts.map