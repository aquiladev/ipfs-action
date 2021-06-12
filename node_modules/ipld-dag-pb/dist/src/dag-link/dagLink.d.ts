export = DAGLink;
/**
 * Link represents an IPFS Merkle DAG Link between Nodes.
 */
declare class DAGLink {
    /**
     * @param {string | undefined | null} name
     * @param {number} size
     * @param {CID | string | Uint8Array} cid
     */
    constructor(name: string | undefined | null, size: number, cid: CID | string | Uint8Array);
    Name: string;
    Tsize: number;
    Hash: CID;
    toString(): string;
    toJSON(): Readonly<{
        name: string;
        size: number;
        cid: string;
    }>;
    _json: Readonly<{
        name: string;
        size: number;
        cid: string;
    }> | undefined;
    get nameAsBuffer(): Uint8Array;
    _nameBuf: Uint8Array | undefined;
}
import CID = require("cids");
//# sourceMappingURL=dagLink.d.ts.map