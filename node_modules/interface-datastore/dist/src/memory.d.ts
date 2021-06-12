export = MemoryDatastore;
/**
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').Datastore} Datastore
 * @typedef {import('interface-store').Options} Options
 */
/**
 * @class MemoryDatastore
 * @implements {Datastore}
 */
declare class MemoryDatastore extends Adapter implements Datastore {
    /** @type {Record<string, Uint8Array>} */
    data: Record<string, Uint8Array>;
}
declare namespace MemoryDatastore {
    export { Pair, Datastore, Options };
}
type Datastore = import('./types').Datastore;
import Adapter = require("./adapter");
type Pair = import('./types').Pair;
type Options = import('interface-store').Options;
//# sourceMappingURL=memory.d.ts.map