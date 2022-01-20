/**
 * @typedef {import('./types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>} RootAPI
 */
export const createMount: import("./lib/configure.js").Factory<(options?: (import("ipfs-core-types/src/root").MountOptions & import("./types").HTTPClientExtraOptions) | undefined) => Promise<import("ipfs-core-types/src/root").MountResult>>;
export type HTTPClientExtraOptions = import('./types').HTTPClientExtraOptions;
export type RootAPI = import('ipfs-core-types/src/root').API<HTTPClientExtraOptions>;
//# sourceMappingURL=mount.d.ts.map