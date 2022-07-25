/**
 * @typedef {import('./types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>} RootAPI
 */
export const createDns: import("./lib/configure.js").Factory<(domain: string, options?: (import("ipfs-core-types/src/root").DNSOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<string>>;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=dns.d.ts.map