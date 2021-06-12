export type NodeReadableStream = import('stream').Readable;
export type FetchOptions = import('../types').FetchOptions;
export type ProgressFn = import('../types').ProgressFn;
/**
 * @typedef {import('stream').Readable} NodeReadableStream
 *
 * @typedef {import('../types').FetchOptions} FetchOptions
 * @typedef {import('../types').ProgressFn} ProgressFn
 */
/**
 * @param {string|Request} url
 * @param {FetchOptions} [options]
 * @returns {Promise<Response>}
 */
export function fetch(url: string | Request, options?: import("../types").FetchOptions | undefined): Promise<Response>;
import { Request } from "native-fetch";
import { Headers } from "native-fetch";
import { Response } from "native-fetch";
export { Request, Headers };
//# sourceMappingURL=fetch.node.d.ts.map