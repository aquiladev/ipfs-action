const { Buffer } = require('buffer')
const BufferList = require('bl/BufferList')

const ZERO_OFFSET = '0'.charCodeAt(0)
const USTAR_MAGIC = Buffer.from('ustar\x00', 'binary')
const GNU_MAGIC = Buffer.from('ustar\x20', 'binary')
const GNU_VER = Buffer.from('\x20\x00', 'binary')
const MAGIC_OFFSET = 257
const VERSION_OFFSET = 263

const clamp = function (index, len, defaultValue) {
  if (typeof index !== 'number') return defaultValue
  index = ~~index // Coerce to integer.
  if (index >= len) return len
  if (index >= 0) return index
  index += len
  if (index >= 0) return index
  return 0
}

const toType = function (flag) {
  switch (flag) {
    case 0:
      return 'file'
    case 1:
      return 'link'
    case 2:
      return 'symlink'
    case 3:
      return 'character-device'
    case 4:
      return 'block-device'
    case 5:
      return 'directory'
    case 6:
      return 'fifo'
    case 7:
      return 'contiguous-file'
    case 72:
      return 'pax-header'
    case 55:
      return 'pax-global-header'
    case 27:
      return 'gnu-long-link-path'
    case 28:
    case 30:
      return 'gnu-long-path'
  }

  return null
}

const indexOf = function (block, num, offset, end) {
  for (; offset < end; offset++) {
    if (block.get(offset) === num) return offset
  }
  return end
}

const cksum = function (block) {
  let sum = 8 * 32
  for (let i = 0; i < 148; i++) sum += block.get(i)
  for (let j = 156; j < 512; j++) sum += block.get(j)
  return sum
}

/* Copied from the node-tar repo and modified to meet
 * tar-stream coding standard.
 *
 * Source: https://github.com/npm/node-tar/blob/51b6627a1f357d2eb433e7378e5f05e83b7aa6cd/lib/header.js#L349
 */
function parse256 (buf) {
  // first byte MUST be either 80 or FF
  // 80 for positive, FF for 2's comp
  let positive
  if (buf.get(0) === 0x80) positive = true
  else if (buf.get(0) === 0xFF) positive = false
  else return null

  // build up a base-256 tuple from the least sig to the highest
  let zero = false
  const tuple = []
  for (let i = buf.length - 1; i > 0; i--) {
    const byte = buf.get(i)
    if (positive) tuple.push(byte)
    else if (zero && byte === 0) tuple.push(0)
    else if (zero) {
      zero = false
      tuple.push(0x100 - byte)
    } else tuple.push(0xFF - byte)
  }

  let sum = 0
  const l = tuple.length
  for (let i = 0; i < l; i++) {
    sum += tuple[i] * Math.pow(256, i)
  }

  return positive ? sum : -1 * sum
}

const decodeOct = function (val, offset, length) {
  val = val.shallowSlice(offset, offset + length)
  offset = 0

  // If prefixed with 0x80 then parse as a base-256 integer
  if (val.get(offset) & 0x80) {
    return parse256(val)
  } else {
    // Older versions of tar can prefix with spaces
    while (offset < val.length && val.get(offset) === 32) offset++
    const end = clamp(indexOf(val, 32, offset, val.length), val.length, val.length)
    while (offset < end && val.get(offset) === 0) offset++
    if (end === offset) return 0
    return parseInt(val.shallowSlice(offset, end).toString(), 8)
  }
}

const decodeStr = function (val, offset, length, encoding) {
  return val.shallowSlice(offset, indexOf(val, 0, offset, offset + length)).toString(encoding)
}

exports.decodeLongPath = function (buf, encoding) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  return decodeStr(buf, 0, buf.length, encoding)
}

exports.decodePax = function (buf) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  const result = {}

  while (buf.length) {
    let i = 0
    while (i < buf.length && buf.get(i) !== 32) i++
    const len = parseInt(buf.shallowSlice(0, i).toString(), 10)
    if (!len) return result

    const b = buf.shallowSlice(i + 1, len - 1).toString()
    const keyIndex = b.indexOf('=')
    if (keyIndex === -1) return result
    result[b.slice(0, keyIndex)] = b.slice(keyIndex + 1)

    buf = buf.shallowSlice(len)
  }

  return result
}

exports.decode = function (buf, filenameEncoding) {
  buf = BufferList.isBufferList(buf) ? buf : new BufferList(buf)
  let typeflag = buf.get(156) === 0 ? 0 : buf.get(156) - ZERO_OFFSET

  let name = decodeStr(buf, 0, 100, filenameEncoding)
  const mode = decodeOct(buf, 100, 8)
  const uid = decodeOct(buf, 108, 8)
  const gid = decodeOct(buf, 116, 8)
  const size = decodeOct(buf, 124, 12)
  const mtime = decodeOct(buf, 136, 12)
  const type = toType(typeflag)
  const linkname = buf.get(157) === 0 ? null : decodeStr(buf, 157, 100, filenameEncoding)
  const uname = decodeStr(buf, 265, 32)
  const gname = decodeStr(buf, 297, 32)
  const devmajor = decodeOct(buf, 329, 8)
  const devminor = decodeOct(buf, 337, 8)

  const c = cksum(buf)

  // checksum is still initial value if header was null.
  if (c === 8 * 32) return null

  // valid checksum
  if (c !== decodeOct(buf, 148, 8)) throw new Error('Invalid tar header. Maybe the tar is corrupted or it needs to be gunzipped?')

  if (USTAR_MAGIC.compare(buf.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6)) === 0) {
    // ustar (posix) format.
    // prepend prefix, if present.
    if (buf.get(345)) name = decodeStr(buf, 345, 155, filenameEncoding) + '/' + name
  } else if (GNU_MAGIC.compare(buf.slice(MAGIC_OFFSET, MAGIC_OFFSET + 6)) === 0 &&
             GNU_VER.compare(buf.slice(VERSION_OFFSET, VERSION_OFFSET + 2)) === 0) {
    // 'gnu'/'oldgnu' format. Similar to ustar, but has support for incremental and
    // multi-volume tarballs.
  } else {
    throw new Error('Invalid tar header: unknown format.')
  }

  // to support old tar versions that use trailing / to indicate dirs
  if (typeflag === 0 && name && name[name.length - 1] === '/') typeflag = 5

  return {
    name: name,
    mode: mode,
    uid: uid,
    gid: gid,
    size: size,
    mtime: new Date(1000 * mtime),
    type: type,
    linkname: linkname,
    uname: uname,
    gname: gname,
    devmajor: devmajor,
    devminor: devminor
  }
}
