const defer = require('p-defer')
const Headers = require('./extract-headers')
const LteReader = require('./lte-reader')

function getPadding (size) {
  size &= 511
  return size && 512 - size
}

async function discardPadding (reader, size) {
  const overflow = getPadding(size)
  if (overflow) await reader.next(overflow)
}

module.exports = options => {
  options = options || {}
  options.highWaterMark = options.highWaterMark || 1024 * 16

  return source => (async function * () {
    const reader = LteReader(source)
    let gnuLongPath, gnuLongLinkPath, paxGlobal, pax

    try {
      while (true) {
        let headerBytes
        try {
          const { done, value } = await reader.next(512)
          if (done) return
          headerBytes = value
        } catch (err) {
          // Is ok, this is the end of the stream!
          if (err.code === 'ERR_UNDER_READ') return
          throw err
        }

        const header = Headers.decode(headerBytes, options.filenameEncoding)
        if (!header) continue

        if (header.type === 'gnu-long-path') {
          const { done, value: gnuLongPathBytes } = await reader.next(header.size)
          if (done) return
          gnuLongPath = Headers.decodeLongPath(gnuLongPathBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'gnu-long-link-path') {
          const { done, value: gnuLongLinkPathBytes } = await reader.next(header.size)
          if (done) return
          gnuLongLinkPath = Headers.decodeLongPath(gnuLongLinkPathBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'pax-global-header') {
          const { done, value: paxGlobalBytes } = await reader.next(header.size)
          if (done) return
          paxGlobal = Headers.decodePax(paxGlobalBytes, options.filenameEncoding)
          await discardPadding(reader, header.size)
          continue
        }

        if (header.type === 'pax-header') {
          const { done, value: paxBytes } = await reader.next(header.size)
          if (done) return
          pax = Headers.decodePax(paxBytes, options.filenameEncoding)
          if (paxGlobal) pax = { ...paxGlobal, ...pax }
          await discardPadding(reader, header.size)
          continue
        }

        if (gnuLongPath) {
          header.name = gnuLongPath
          gnuLongPath = null
        }

        if (gnuLongLinkPath) {
          header.linkname = gnuLongLinkPath
          gnuLongLinkPath = null
        }

        if (pax) {
          if (pax.path) header.name = pax.path
          if (pax.linkpath) header.linkname = pax.linkpath
          if (pax.size) header.size = parseInt(pax.size, 10)
          header.pax = pax
          pax = null
        }

        if (!header.size || header.type === 'directory') {
          yield { header, body: (async function * () {})() }
          continue
        }

        let bytesRemaining = header.size
        const bodyConsumed = defer()

        // Prefetch the first chunk.
        // This allows us to stream entries for small files from the tar without
        // explicitly streaming the body of each.
        const firstChunk = await reader.nextLte(Math.min(bytesRemaining, options.highWaterMark))
        bytesRemaining -= firstChunk.value.length

        if (!bytesRemaining) bodyConsumed.resolve()

        const body = (async function * () {
          try {
            yield firstChunk.value

            while (bytesRemaining) {
              const { done, value } = await reader.nextLte(bytesRemaining)
              if (done) {
                bytesRemaining = 0
                return
              }
              bytesRemaining -= value.length
              yield value
            }
          } finally {
            bodyConsumed.resolve()
          }
        })()

        yield { header, body }

        // Wait for the body to be consumed
        await bodyConsumed.promise

        // Incase the body was not consumed entirely...
        if (bytesRemaining) {
          for await (const _ of body) {} // eslint-disable-line no-unused-vars,no-empty
        }

        await discardPadding(reader, header.size)
      }
    } finally {
      await reader.return()
    }
  })()
}
