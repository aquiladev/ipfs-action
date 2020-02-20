const { Buffer } = require('buffer')

var alloc = Buffer.alloc

var ZEROS = '0000000000000000000'
var SEVENS = '7777777777777777777'
var ZERO_OFFSET = '0'.charCodeAt(0)
var USTAR_MAGIC = Buffer.from('ustar\x00', 'binary')
var USTAR_VER = Buffer.from('00', 'binary')
var MASK = parseInt('7777', 8)
var MAGIC_OFFSET = 257
var VERSION_OFFSET = 263

var toTypeflag = function (flag) {
  switch (flag) {
    case 'file':
      return 0
    case 'link':
      return 1
    case 'symlink':
      return 2
    case 'character-device':
      return 3
    case 'block-device':
      return 4
    case 'directory':
      return 5
    case 'fifo':
      return 6
    case 'contiguous-file':
      return 7
    case 'pax-header':
      return 72
  }

  return 0
}

var cksum = function (block) {
  var sum = 8 * 32
  for (var i = 0; i < 148; i++) sum += block[i]
  for (var j = 156; j < 512; j++) sum += block[j]
  return sum
}

var encodeOct = function (val, n) {
  val = val.toString(8)
  if (val.length > n) return SEVENS.slice(0, n) + ' '
  else return ZEROS.slice(0, n - val.length) + val + ' '
}

var addLength = function (str) {
  var len = Buffer.byteLength(str)
  var digits = Math.floor(Math.log(len) / Math.log(10)) + 1
  if (len + digits >= Math.pow(10, digits)) digits++

  return (len + digits) + str
}

exports.encodePax = function (opts) { // TODO: encode more stuff in pax
  var result = ''
  if (opts.name) result += addLength(' path=' + opts.name + '\n')
  if (opts.linkname) result += addLength(' linkpath=' + opts.linkname + '\n')
  var pax = opts.pax
  if (pax) {
    for (var key in pax) {
      result += addLength(' ' + key + '=' + pax[key] + '\n')
    }
  }
  return Buffer.from(result)
}

exports.encode = function (opts) {
  var buf = alloc(512)
  var name = opts.name
  var prefix = ''

  if (opts.typeflag === 5 && name[name.length - 1] !== '/') name += '/'
  if (Buffer.byteLength(name) !== name.length) return null // utf-8

  while (Buffer.byteLength(name) > 100) {
    var i = name.indexOf('/')
    if (i === -1) return null
    prefix += prefix ? '/' + name.slice(0, i) : name.slice(0, i)
    name = name.slice(i + 1)
  }

  if (Buffer.byteLength(name) > 100 || Buffer.byteLength(prefix) > 155) return null
  if (opts.linkname && Buffer.byteLength(opts.linkname) > 100) return null

  buf.write(name)
  buf.write(encodeOct(opts.mode & MASK, 6), 100)
  buf.write(encodeOct(opts.uid, 6), 108)
  buf.write(encodeOct(opts.gid, 6), 116)
  buf.write(encodeOct(opts.size, 11), 124)
  buf.write(encodeOct((opts.mtime.getTime() / 1000) | 0, 11), 136)

  buf[156] = ZERO_OFFSET + toTypeflag(opts.type)

  if (opts.linkname) buf.write(opts.linkname, 157)

  USTAR_MAGIC.copy(buf, MAGIC_OFFSET)
  USTAR_VER.copy(buf, VERSION_OFFSET)
  if (opts.uname) buf.write(opts.uname, 265)
  if (opts.gname) buf.write(opts.gname, 297)
  buf.write(encodeOct(opts.devmajor || 0, 6), 329)
  buf.write(encodeOct(opts.devminor || 0, 6), 337)

  if (prefix) buf.write(prefix, 345)

  buf.write(encodeOct(cksum(buf), 6), 148)

  return buf
}
