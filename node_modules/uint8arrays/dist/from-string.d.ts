export = fromString;
/**
 * Create a `Uint8Array` from the passed string
 *
 * Supports `utf8`, `utf-8` and any encoding supported by the multibase module.
 *
 * Also `ascii` which is similar to node's 'binary' encoding.
 *
 * @param {string} string
 * @param {SupportedEncodings} [encoding=utf8] - utf8, base16, base64, base64urlpad, etc
 * @returns {Uint8Array}
 */
declare function fromString(string: string, encoding?: SupportedEncodings): Uint8Array;
declare namespace fromString {
    export { SupportedEncodings };
}
type SupportedEncodings = import('multibase/src/types').BaseName | 'utf8' | 'utf-8' | 'ascii' | undefined;
//# sourceMappingURL=from-string.d.ts.map