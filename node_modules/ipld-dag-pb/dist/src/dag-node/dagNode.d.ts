export = DAGNode;
/**
 * @typedef {import('cids')} CID
 * @typedef {import('../types').DAGLinkLike} DAGLinkLike
 */
declare class DAGNode {
    /**
     *@param {Uint8Array | string} [data]
     * @param {(DAGLink | DAGLinkLike)[]} links
     * @param {number | null} [serializedSize]
     */
    constructor(data?: string | Uint8Array | undefined, links?: (DAGLink | DAGLinkLike)[], serializedSize?: number | null | undefined);
    Data: Uint8Array;
    Links: DAGLink[];
    toJSON(): Readonly<{
        data: Uint8Array;
        links: Readonly<{
            name: string;
            size: number;
            cid: string;
        }>[];
        size: number;
    }>;
    _json: Readonly<{
        data: Uint8Array;
        links: Readonly<{
            name: string;
            size: number;
            cid: string;
        }>[];
        size: number;
    }> | undefined;
    toString(): string;
    _invalidateCached(): void;
    _serializedSize: number | null | undefined;
    _size: number | null | undefined;
    /**
     * @param {DAGLink | import('../types').DAGLinkLike} link
     */
    addLink(link: DAGLink | import('../types').DAGLinkLike): void;
    /**
     * @param {DAGLink | string | CID} link
     */
    rmLink(link: DAGLink | string | CID): void;
    /**
     * @param {import('./toDagLink').ToDagLinkOptions} [options]
     */
    toDAGLink(options?: toDAGLink.ToDagLinkOptions | undefined): Promise<DAGLink>;
    serialize(): Uint8Array;
    set size(arg: number);
    get size(): number;
}
declare namespace DAGNode {
    export { CID, DAGLinkLike };
}
import DAGLink = require("../dag-link/dagLink");
type CID = import('cids');
import toDAGLink = require("./toDagLink");
type DAGLinkLike = import('../types').DAGLinkLike;
//# sourceMappingURL=dagNode.d.ts.map