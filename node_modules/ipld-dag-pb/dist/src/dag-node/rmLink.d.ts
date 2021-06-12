export = rmLink;
/**
 * @typedef {import('../dag-link/dagLink')} DAGLink
 */
/**
 *
 * @param {import('./dagNode')} dagNode
 * @param {string | CID | Uint8Array | DAGLink} nameOrCid
 */
declare function rmLink(dagNode: import('./dagNode'), nameOrCid: string | CID | Uint8Array | DAGLink): void;
declare namespace rmLink {
    export { DAGLink };
}
import CID = require("cids");
type DAGLink = import('../dag-link/dagLink');
//# sourceMappingURL=rmLink.d.ts.map