import { CID } from 'multiformats'
import { base64 } from 'multiformats/bases/base64'
import { Token, Type } from 'cborg'
import * as cborgJson from 'cborg/json'

/**
 * @template T
 * @typedef {import('multiformats/codecs/interface').ByteView<T>} ByteView
 */
/**
 * @typedef {import('cborg/interface').DecodeTokenizer} DecodeTokenizer
 */

/**
 * cidEncoder will receive all Objects during encode, it needs to filter out
 * anything that's not a CID and return `null` for that so it's encoded as
 * normal. Encoding a CID means replacing it with a `{"/":"<CidString>}`
 * object as per the DAG-JSON spec.
 *
 * @param {any} obj
 * @returns {Token[]|null}
 */
function cidEncoder (obj) {
  if (obj.asCID !== obj) {
    return null // any other kind of object
  }
  const cid = CID.asCID(obj)
  /* c8 ignore next 4 */
  // very unlikely case, and it'll probably throw a recursion error in cborg
  if (!cid) {
    return null
  }
  const cidString = cid.toString()

  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, '/', 1), // key
    new Token(Type.string, cidString, cidString.length), // value
    new Token(Type.break, undefined, 1)
  ]
}

/**
 * bytesEncoder will receive all Uint8Arrays (and friends) during encode, it
 * needs to replace it with a `{"/":{"bytes":"Base64ByteString"}}` object as
 * per the DAG-JSON spec.
 *
 * @param {Uint8Array} bytes
 * @returns {Token[]|null}
 */
function bytesEncoder (bytes) {
  const bytesString = base64.encode(bytes).slice(1) // no mbase prefix
  return [
    new Token(Type.map, Infinity, 1),
    new Token(Type.string, '/', 1), // key
    new Token(Type.map, Infinity, 1), // value
    new Token(Type.string, 'bytes', 5), // inner key
    new Token(Type.string, bytesString, bytesString.length), // inner value
    new Token(Type.break, undefined, 1),
    new Token(Type.break, undefined, 1)
  ]
}

/**
 * Intercept all `undefined` values from an object walk and reject the entire
 * object if we find one.
 *
 * @returns {null}
 */
function undefinedEncoder () {
  throw new Error('`undefined` is not supported by the IPLD Data Model and cannot be encoded')
}

/**
 * Intercept all `number` values from an object walk and reject the entire
 * object if we find something that doesn't fit the IPLD data model (NaN &
 * Infinity).
 *
 * @param {number} num
 * @returns {null}
 */
function numberEncoder (num) {
  if (Number.isNaN(num)) {
    throw new Error('`NaN` is not supported by the IPLD Data Model and cannot be encoded')
  }
  if (num === Infinity || num === -Infinity) {
    throw new Error('`Infinity` and `-Infinity` is not supported by the IPLD Data Model and cannot be encoded')
  }
  return null // process with standard number encoder
}

const encodeOptions = {
  typeEncoders: {
    Object: cidEncoder,
    Uint8Array: bytesEncoder, // TODO: all the typedarrays
    Buffer: bytesEncoder, // TODO: all the typedarrays
    undefined: undefinedEncoder,
    number: numberEncoder
  }
}

/**
 * @implements {DecodeTokenizer}
 */
class DagJsonTokenizer extends cborgJson.Tokenizer {
  /**
   * @param {Uint8Array} data
   * @param {object} [options]
   */
  constructor (data, options) {
    super(data, options)
    /** @type {Token[]} */
    this.tokenBuffer = []
  }

  /**
   * @returns {boolean}
   */
  done () {
    return this.tokenBuffer.length === 0 && super.done()
  }

  /**
   * @returns {Token}
   */
  _next () {
    if (this.tokenBuffer.length > 0) {
      // @ts-ignore https://github.com/Microsoft/TypeScript/issues/30406
      return this.tokenBuffer.pop()
    }
    return super.next()
  }

  /**
   * Implements rules outlined in https://github.com/ipld/specs/pull/356
   *
   * @returns {Token}
   */
  next () {
    const token = this._next()

    if (token.type === Type.map) {
      const keyToken = this._next()
      if (keyToken.type === Type.string && keyToken.value === '/') {
        const valueToken = this._next()
        if (valueToken.type === Type.string) { // *must* be a CID
          const breakToken = this._next() // swallow the end-of-map token
          if (breakToken.type !== Type.break) {
            throw new Error('Invalid encoded CID form')
          }
          this.tokenBuffer.push(valueToken) // CID.parse will pick this up after our tag token
          return new Token(Type.tag, 42, 0)
        }
        if (valueToken.type === Type.map) {
          const innerKeyToken = this._next()
          if (innerKeyToken.type === Type.string && innerKeyToken.value === 'bytes') {
            const innerValueToken = this._next()
            if (innerValueToken.type === Type.string) { // *must* be Bytes
              for (let i = 0; i < 2; i++) {
                const breakToken = this._next() // swallow two end-of-map tokens
                if (breakToken.type !== Type.break) {
                  throw new Error('Invalid encoded Bytes form')
                }
              }
              const bytes = base64.decode(`m${innerValueToken.value}`)
              return new Token(Type.bytes, bytes, innerValueToken.value.length)
            }
            this.tokenBuffer.push(innerValueToken) // bail
          }
          this.tokenBuffer.push(innerKeyToken) // bail
        }
        this.tokenBuffer.push(valueToken) // bail
      }
      this.tokenBuffer.push(keyToken) // bail
    }
    return token
  }
}

const decodeOptions = {
  allowIndefinite: false,
  allowUndefined: false,
  allowNaN: false,
  allowInfinity: false,
  allowBigInt: true, // this will lead to BigInt for ints outside of
  // safe-integer range, which may surprise users
  strict: true,
  useMaps: false,
  /** @type {import('cborg').TagDecoder[]} */
  tags: []
}

// we're going to get TAG(42)STRING("bafy...") from the tokenizer so we only need
// to deal with the STRING("bafy...") at this point
decodeOptions.tags[42] = CID.parse

export const name = 'dag-json'
export const code = 0x0129

/**
 * @template T
 * @param {T} node
 * @returns {ByteView<T>}
 */
export const encode = (node) => cborgJson.encode(node, encodeOptions)

/**
 * @template T
 * @param {ByteView<T>} data
 * @returns {T}
 */
export const decode = (data) => {
  // the tokenizer is stateful so we need a single instance of it
  const options = Object.assign(decodeOptions, { tokenizer: new DagJsonTokenizer(data, decodeOptions) })
  return cborgJson.decode(data, options)
}
