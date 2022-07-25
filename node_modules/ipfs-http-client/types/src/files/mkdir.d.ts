/**
 * @typedef {import('../types').HTTPClientExtraOptions} HTTPClientExtraOptions
 * @typedef {import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>} FilesAPI
 */
export const createMkdir: import("../lib/configure.js").Factory<(path: string, options?: (import("ipfs-core-types/src/files").MkdirOptions & import("../types").HTTPClientExtraOptions) | undefined) => Promise<void>>;
export type HTTPClientExtraOptions = import('../types').HTTPClientExtraOptions;
export type FilesAPI = import('ipfs-core-types/src/files').API<HTTPClientExtraOptions>;
//# sourceMappingURL=mkdir.d.ts.map