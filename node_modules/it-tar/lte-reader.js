const BufferList = require('bl/BufferList')
const Reader = require('it-reader')

module.exports = function LteReader (source) {
  const reader = Reader(source)
  let overflow
  const lteReader = {
    [Symbol.asyncIterator]: () => lteReader,
    async next (bytes) {
      if (overflow) {
        let value
        if (bytes == null || overflow.length === bytes) {
          value = overflow
          overflow = null
        } else if (overflow.length > bytes) {
          value = overflow.shallowSlice(0, bytes)
          overflow = overflow.shallowSlice(bytes)
        } else if (overflow.length < bytes) {
          const { value: nextValue, done } = await reader.next(bytes - overflow.length)
          if (done) {
            throw Object.assign(
              new Error(`stream ended before ${bytes - overflow.length} bytes became available`),
              { code: 'ERR_UNDER_READ' }
            )
          }
          value = new BufferList([overflow, nextValue])
          overflow = null
        }
        return { value }
      }
      return reader.next(bytes)
    },
    async nextLte (bytes) {
      let { done, value } = await lteReader.next()
      if (done) return { done }
      if (value.length <= bytes) return { value }
      value = BufferList.isBufferList(value) ? value : new BufferList(value)
      if (overflow) {
        overflow.append(value.shallowSlice(bytes))
      } else {
        overflow = value.shallowSlice(bytes)
      }
      return { value: value.shallowSlice(0, bytes) }
    },
    return () {
      return reader.return()
    }
  }
  return lteReader
}
