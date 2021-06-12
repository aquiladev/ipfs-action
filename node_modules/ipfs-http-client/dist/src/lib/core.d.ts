export = Client;
declare class Client extends HTTP {
    /**
     * @param {Options|URL|Multiaddr|string} [options]
     */
    constructor(options?: string | import("../types").Options | URL | Multiaddr | undefined);
}
declare namespace Client {
    export { errorHandler, HTTPOptions, Options };
}
import HTTP = require("ipfs-utils/src/http");
import { Multiaddr } from "multiaddr";
/**
 * @param {Response} response
 */
declare function errorHandler(response: Response): Promise<never>;
type HTTPOptions = import('ipfs-utils/src/types').HTTPOptions;
type Options = import('../types').Options;
//# sourceMappingURL=core.d.ts.map