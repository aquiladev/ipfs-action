/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>} FilesAPI
 */
export const createChmod: import("../lib/configure.js").Factory<(path: string, mode: string | number, options?: (import("ipfs-core-types/src/files").ChmodOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=chmod.d.ts.map