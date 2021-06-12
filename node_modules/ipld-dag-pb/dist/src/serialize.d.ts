export type DAGLink = import('./dag-link/dagLink');
export type DAGLinkLike = import('./types').DAGLinkLike;
export type SerializableDAGNode = import('./types').SerializableDAGNode;
export type CID = import('cids');
/**
 * Serialize internal representation into a binary PB block.
 *
 * @param {import('./dag-node/dagNode')} node - Internal representation of a PB block
 */
export function serializeDAGNode(node: import('./dag-node/dagNode')): Uint8Array;
/**
 * Serialize an object where the `Links` might not be a `DAGLink` instance yet
 *
 * @param {Uint8Array} [data]
 * @param {(DAGLink | string | DAGLinkLike)[]} [links]
 */
export function serializeDAGNodeLike(data?: Uint8Array | undefined, links?: (string | import("./dag-link/dagLink") | import("./types").DAGLinkLike)[] | undefined): Uint8Array;
//# sourceMappingURL=serialize.d.ts.map