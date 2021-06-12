export = multipartRequest;
/**
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidateStream} ImportCandidateStream
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidate} ImportCandidate
 */
/**
 * @param {ImportCandidateStream|ImportCandidate} source
 * @param {AbortController} abortController
 * @param {Headers|Record<string, string>} [headers]
 * @param {string} [boundary]
 */
declare function multipartRequest(source: ImportCandidateStream | ImportCandidate, abortController: AbortController, headers?: Headers | Record<string, string> | undefined, boundary?: string | undefined): Promise<{
    parts: null;
    total: number;
    headers: any;
    body: any;
}>;
declare namespace multipartRequest {
    export { ImportCandidateStream, ImportCandidate };
}
type ImportCandidateStream = import('ipfs-core-types/src/utils').ImportCandidateStream;
type ImportCandidate = import('ipfs-core-types/src/utils').ImportCandidate;
//# sourceMappingURL=multipart-request.node.d.ts.map