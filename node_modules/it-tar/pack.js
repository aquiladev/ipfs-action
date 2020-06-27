const { Buffer } = require('buffer')
const BufferList = require('bl/BufferList')
const { S_IFMT, S_IFBLK, S_IFCHR, S_IFDIR, S_IFIFO, S_IFLNK } = require('iso-constants')
const concat = require('it-concat')
const Headers = require('./pack-headers')

const DMODE = parseInt('755', 8)
const FMODE = parseInt('644', 8)

const END_OF_TAR = Buffer.alloc(1024)

function modeToType (mode) {
  switch (mode & S_IFMT) {
    case S_IFBLK: return 'block-device'
    case S_IFCHR: return 'character-device'
    case S_IFDIR: return 'directory'
    case S_IFIFO: return 'fifo'
    case S_IFLNK: return 'symlink'
  }
  return 'file'
}

function getPadding (size) {
  size &= 511
  if (size) return new BufferList(END_OF_TAR.slice(0, 512 - size))
}

function encode (header) {
  if (!header.pax) {
    const encoded = Headers.encode(header)
    if (encoded) return encoded
  }
  return encodePax(header)
}

function encodePax (header) {
  const paxHeader = Headers.encodePax({
    name: header.name,
    linkname: header.linkname,
    pax: header.pax
  })

  const newHeader = {
    name: 'PaxHeader',
    mode: header.mode,
    uid: header.uid,
    gid: header.gid,
    size: paxHeader.length,
    mtime: header.mtime,
    type: 'pax-header',
    linkname: header.linkname && 'PaxHeader',
    uname: header.uname,
    gname: header.gname,
    devmajor: header.devmajor,
    devminor: header.devminor
  }

  return new BufferList([
    Headers.encode(newHeader),
    paxHeader,
    getPadding(paxHeader.length),
    Headers.encode({ ...newHeader, size: header.size, type: header.type })
  ])
}

module.exports = () => async function * (source) {
  for await (let { header, body } of source) {
    if (!header.size || header.type === 'symlink') header.size = 0
    if (!header.type) header.type = modeToType(header.mode)
    if (!header.mode) header.mode = header.type === 'directory' ? DMODE : FMODE
    if (!header.uid) header.uid = 0
    if (!header.gid) header.gid = 0
    if (!header.mtime) header.mtime = new Date()

    if (typeof body === 'string') body = Buffer.from(body)

    if (Buffer.isBuffer(body) || BufferList.isBufferList(body)) {
      header.size = body.length
      yield new BufferList([encode(header), body, getPadding(header.size)])
      continue
    }

    if (header.type === 'symlink' && !header.linkname) {
      header.linkname = (await concat(body)).toString()
      yield encode(header)
      continue
    }

    yield encode(header)

    if (header.type !== 'file' && header.type !== 'contiguous-file') {
      continue
    }

    let written = 0
    for await (const chunk of body) {
      written += chunk.length
      yield BufferList.isBufferList(chunk) ? chunk : new BufferList(chunk)
    }

    if (written !== header.size) { // corrupting tar
      throw new Error('size mismatch')
    }

    const overflow = getPadding(header.size)
    if (overflow) yield overflow
  }

  yield new BufferList(END_OF_TAR)
}
