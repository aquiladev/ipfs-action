export = configure;
/**
 * @typedef { import("../types").Options } Options
 */
/**
 * @template T
 * @typedef {(client: Client, clientOptions: Options) => T} Fn
 */
/**
 * @template T
 * @typedef {(clientOptions: Options) => T} Factory
 */
/**
 * @template T
 * @param {Fn<T>} fn
 * @returns {Factory<T>}
 */
declare function configure<T>(fn: Fn<T>): Factory<T>;
declare namespace configure {
    export { Options, Fn, Factory };
}
type Fn<T> = (client: Client, clientOptions: Options) => T;
type Factory<T> = (clientOptions: Options) => T;
type Options = import("../types").Options;
import Client = require("./core");
//# sourceMappingURL=configure.d.ts.map