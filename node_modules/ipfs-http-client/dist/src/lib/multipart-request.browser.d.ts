export = multipartRequest;
/**
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidateStream} ImportCandidateStream
 * @typedef {import('ipfs-core-types/src/utils').ImportCandidate} ImportCandidate
 */
/**
 * @param {ImportCandidateStream|ImportCandidate} source
 * @param {AbortController} abortController
 * @param {Headers|Record<string, string>} [headers]
 */
declare function multipartRequest(source: ImportCandidateStream | ImportCandidate, abortController: AbortController, headers?: Headers | Record<string, string> | undefined): Promise<{
    total: number;
    parts: {
        name: string | undefined;
        start: number;
        end: number;
    }[];
    headers: Headers | Record<string, string>;
    body: FormData;
}>;
declare namespace multipartRequest {
    export { ImportCandidateStream, ImportCandidate };
}
type ImportCandidateStream = import('ipfs-core-types/src/utils').ImportCandidateStream;
type ImportCandidate = import('ipfs-core-types/src/utils').ImportCandidate;
//# sourceMappingURL=multipart-request.browser.d.ts.map