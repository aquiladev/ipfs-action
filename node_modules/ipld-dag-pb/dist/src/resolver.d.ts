export function resolve(binaryBlob: Uint8Array, path?: string | undefined): {
    value: CID;
    remainderPath: string;
} | {
    value: import("./dag-node/dagNode");
    remainderPath: string;
};
export function tree(binaryBlob: Uint8Array): Generator<string, void, unknown>;
import CID = require("cids");
//# sourceMappingURL=resolver.d.ts.map