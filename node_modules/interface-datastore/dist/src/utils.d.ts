/**
 * Collect all values from the iterable and sort them using
 * the passed sorter function
 *
 * @template T
 * @param {AsyncIterable<T> | Iterable<T>} iterable
 * @param {(a: T, b: T) => -1 | 0 | 1} sorter
 * @returns {AsyncIterable<T>}
 */
export function sortAll<T>(iterable: AsyncIterable<T> | Iterable<T>, sorter: (a: T, b: T) => -1 | 0 | 1): AsyncIterable<T>;
import tempdir = require("ipfs-utils/src/temp-dir");
/**
 * @param {string} s
 * @param {string} r
 */
export function replaceStartWith(s: string, r: string): string;
export { tempdir as tmpdir };
//# sourceMappingURL=utils.d.ts.map