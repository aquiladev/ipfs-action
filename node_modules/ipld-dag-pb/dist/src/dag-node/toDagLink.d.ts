export = toDAGLink;
/**
 * toDAGLink converts a DAGNode to a DAGLink
 *
 * @typedef {import('../genCid').GenCIDOptions} GenCIDOptions
 *
 * @typedef {object} ToDagLinkExtraOptions
 * @property {string} [name]
 *
 * @typedef {GenCIDOptions & ToDagLinkExtraOptions} ToDagLinkOptions
 *
 * @param {import('./dagNode')} node
 * @param {ToDagLinkOptions} options
 */
declare function toDAGLink(node: import('./dagNode'), options?: ToDagLinkOptions): Promise<DAGLink>;
declare namespace toDAGLink {
    export { GenCIDOptions, ToDagLinkExtraOptions, ToDagLinkOptions };
}
/**
 * toDAGLink converts a DAGNode to a DAGLink
 */
type ToDagLinkOptions = GenCIDOptions & ToDagLinkExtraOptions;
import DAGLink = require("../dag-link/dagLink");
/**
 * toDAGLink converts a DAGNode to a DAGLink
 */
type GenCIDOptions = import('../genCid').GenCIDOptions;
/**
 * toDAGLink converts a DAGNode to a DAGLink
 */
type ToDagLinkExtraOptions = {
    name?: string | undefined;
};
//# sourceMappingURL=toDagLink.d.ts.map