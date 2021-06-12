export = addLink;
/**
 * @param {DAGNode} node
 * @param {DAGLink | DAGLinkLike} link
 */
declare function addLink(node: DAGNode, link: DAGLink | DAGLinkLike): void;
declare namespace addLink {
    export { DAGNode, DAGLinkLike };
}
type DAGNode = import('./dagNode');
import DAGLink = require("../dag-link/dagLink");
type DAGLinkLike = typeof import("../types");
//# sourceMappingURL=addLink.d.ts.map