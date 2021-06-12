export = format;
/**
 * @typedef {import('./types').DAGLinkLike} DAGLinkLike
 * @typedef {import('./types').DAGNodeLike} DAGNodeLike
 * @typedef {import('./dag-node/dagNode')} DAGNode
 * @typedef {import('./dag-link/dagLink')} DAGLink
 */
/**
 * @type {import('./types').DAGNodeFormat}
 */
declare const format: import('./types').DAGNodeFormat;
declare namespace format {
    export { DAGLinkLike, DAGNodeLike, DAGNode, DAGLink };
}
type DAGLinkLike = import('./types').DAGLinkLike;
type DAGNodeLike = import('./types').DAGNodeLike;
type DAGNode = import('./dag-node/dagNode');
type DAGLink = import('./dag-link/dagLink');
//# sourceMappingURL=index.d.ts.map