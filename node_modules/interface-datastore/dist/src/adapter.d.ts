export = Adapter;
/**
 * @typedef {import('interface-store').Options} Options
 * @typedef {import('./key')} Key
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').Datastore} Datastore
 * @typedef {import('./types').Query} Query
 * @typedef {import('./types').KeyQuery} KeyQuery
 * @typedef {import('./types').Batch} Batch
 */
/**
 * @template O
 * @typedef {import('interface-store').AwaitIterable<O>} AwaitIterable
 */
/**
 * @implements {Datastore}
 */
declare class Adapter implements Datastore {
    /**
     * @returns {Promise<void>}
     */
    open(): Promise<void>;
    /**
     * @returns {Promise<void>}
     */
    close(): Promise<void>;
    /**
     * @param {Key} key
     * @param {Uint8Array} val
     * @param {Options} [options]
     * @returns {Promise<void>}
     */
    put(key: Key, val: Uint8Array, options?: import("interface-store").Options | undefined): Promise<void>;
    /**
     * @param {Key} key
     * @param {Options} [options]
     * @returns {Promise<Uint8Array>}
     */
    get(key: Key, options?: import("interface-store").Options | undefined): Promise<Uint8Array>;
    /**
     * @param {Key} key
     * @param {Options} [options]
     * @returns {Promise<boolean>}
     */
    has(key: Key, options?: import("interface-store").Options | undefined): Promise<boolean>;
    /**
     * @param {Key} key
     * @param {Options} [options]
     * @returns {Promise<void>}
     */
    delete(key: Key, options?: import("interface-store").Options | undefined): Promise<void>;
    /**
     * @param {AwaitIterable<Pair>} source
     * @param {Options} [options]
     * @returns {AsyncIterable<Pair>}
     */
    putMany(source: AwaitIterable<Pair>, options?: import("interface-store").Options | undefined): AsyncIterable<Pair>;
    /**
     * @param {AwaitIterable<Key>} source
     * @param {Options} [options]
     * @returns {AsyncIterable<Uint8Array>}
     */
    getMany(source: AwaitIterable<Key>, options?: import("interface-store").Options | undefined): AsyncIterable<Uint8Array>;
    /**
     * @param {AwaitIterable<Key>} source
     * @param {Options} [options]
     * @returns {AsyncIterable<Key>}
     */
    deleteMany(source: AwaitIterable<Key>, options?: import("interface-store").Options | undefined): AsyncIterable<Key>;
    /**
     * @returns {Batch}
     */
    batch(): Batch;
    /**
     * Extending classes should override `query` or implement this method
     *
     * @param {Query} q
     * @param {Options} [options]
     * @returns {AsyncIterable<Pair>}
     */
    _all(q: Query, options?: import("interface-store").Options | undefined): AsyncIterable<Pair>;
    /**
     * Extending classes should override `queryKeys` or implement this method
     *
     * @param {KeyQuery} q
     * @param {Options} [options]
     * @returns {AsyncIterable<Key>}
     */
    _allKeys(q: KeyQuery, options?: import("interface-store").Options | undefined): AsyncIterable<Key>;
    /**
     * @param {Query} q
     * @param {Options} [options]
     */
    query(q: Query, options?: import("interface-store").Options | undefined): AsyncIterable<import("./types").Pair>;
    /**
     * @param {KeyQuery} q
     * @param {Options} [options]
     */
    queryKeys(q: KeyQuery, options?: import("interface-store").Options | undefined): AsyncIterable<import("./key")>;
}
declare namespace Adapter {
    export { Options, Key, Pair, Datastore, Query, KeyQuery, Batch, AwaitIterable };
}
type Datastore = import('./types').Datastore;
type Key = import('./key');
type AwaitIterable<O> = import('interface-store').AwaitIterable<O>;
type Pair = import('./types').Pair;
type Batch = import('./types').Batch;
type Query = import('./types').Query;
type KeyQuery = import('./types').KeyQuery;
type Options = import('interface-store').Options;
//# sourceMappingURL=adapter.d.ts.map