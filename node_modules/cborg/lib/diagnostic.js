import { Tokeniser } from './decode.js'
import { toHex } from './byte-utils.js'

/**
 * @param {Uint8Array} inp
 * @param {number} [width]
 */
function * tokensToDiagnostic (inp, width = 100) {
  const tokeniser = new Tokeniser(inp)
  let pos = 0
  const indent = []

  /**
   * @param {number} start
   * @param {number} length
   * @returns {string}
   */
  const slc = (start, length) => {
    return toHex(inp.slice(pos + start, pos + start + length))
  }

  while (!tokeniser.done()) {
    const token = tokeniser.next()
    let margin = ''.padStart(indent.length * 2, ' ')
    // @ts-ignore should be safe for decode
    let vLength = token.encodedLength - 1
    /** @type {string|number} */
    let v = String(token.value)
    const str = token.type.name === 'bytes' || token.type.name === 'string'
    if (token.type.name === 'string') {
      v = v.length
      vLength -= v
    } else if (token.type.name === 'bytes') {
      v = token.value.length
      // @ts-ignore
      vLength -= v
    }

    let outp = `${margin}${slc(0, 1)} ${slc(1, vLength)}`

    outp = outp.padEnd(width / 2, ' ')
    outp += `# ${margin}${token.type.name}`
    if (token.type.name !== v) {
      outp += `(${v})`
    }
    yield outp

    if (str) {
      margin += '  '
      const repr = token.type.name === 'bytes' ? token.value : new TextEncoder().encode(token.value)
      const wh = ((width / 2) - margin.length - 1) / 2
      let snip = 0
      while (repr.length - snip > 0) {
        const piece = repr.slice(snip, snip + wh)
        snip += piece.length
        // the assumption that we can utf8 a byte-sliced version is a stretch,
        // we could be slicing in the middle of a multi-byte character
        const st = token.type.name === 'string'
          ? new TextDecoder().decode(piece)
          : piece.reduce((/** @type {string} */ p, /** @type {number} */ c) => {
            if (c < 0x20 || c === 0x7f) {
              return `${p}\\x${c.toString(16).padStart(2, '0')}`
            }
            return `${p}${String.fromCharCode(c)}`
          }, '')
        yield `${margin}${toHex(piece)}`.padEnd(width / 2, ' ') + `# ${margin}"${st}"`
      }
    }

    if (!token.type.terminal) {
      switch (token.type.name) {
        case 'map':
          if (token.value) {
            indent.push(token.value * 2)
          }
          break
        case 'array':
          if (token.value) {
            indent.push(token.value)
          }
          break
        // TODO: test tags .. somehow
        /* c8 ignore next 5 */
        case 'tag':
          indent.push(1)
          break
        default:
          throw new Error(`Unknown token type '${token.type.name}'`)
      }
    } else {
      if (indent.length) {
        indent[indent.length - 1]--
        if (indent[indent.length - 1] === 0) {
          indent.pop()
        }
      }
    }
    // @ts-ignore it should be set on a decode operation
    pos += token.encodedLength
  }
}

export { tokensToDiagnostic }
