export type FetchOptions = import('../types').FetchOptions;
export type ProgressFn = import('../types').ProgressFn;
/**
 * @param {string | Request} url
 * @param {FetchOptions} options
 */
declare function fetchWith(url: string | Request, options?: FetchOptions): any;
import { Request } from "native-fetch";
import { Headers } from "native-fetch";
export { fetchWith as fetch, Request, Headers };
//# sourceMappingURL=fetch.browser.d.ts.map