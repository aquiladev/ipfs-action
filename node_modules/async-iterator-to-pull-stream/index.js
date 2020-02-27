const getIterator = require('get-iterator')
const toIterable = require('pull-stream-to-async-iterator')

function toPull (source) {
  source = getIterator(source)

  return async (end, cb) => {
    if (end) {
      if (source.return) {
        try {
          await source.return()
        } catch (err) {
          return cb(err)
        }
      }
      return cb(end)
    }

    let next
    try {
      next = await source.next()
    } catch (err) {
      return cb(err)
    }

    if (next.done) return cb(true) // eslint-disable-line
    cb(null, next.value)
  }
}

toPull.source = toPull

toPull.transform = toPull.through = source => read => toPull(source(toIterable(read)))

toPull.duplex = duplex => ({
  sink: toPull.sink(duplex.sink),
  source: toPull(duplex.source)
})

toPull.sink = sink => {
  return read => {
    sink({
      [Symbol.asyncIterator] () {
        return this
      },

      next: () => new Promise((resolve, reject) => {
        read(null, (end, value) => {
          if (end === true) return resolve({ done: true, value })
          if (end) return reject(end)
          resolve({ done: false, value })
        })
      }),

      return: () => new Promise((resolve, reject) => {
        read(true, (end, value) => {
          if (end && end !== true) return reject(end)
          resolve({ done: true, value })
        })
      }),

      throw: err => new Promise((resolve, reject) => {
        read(err, (end, value) => {
          if (end && end !== true) return reject(end)
          resolve({ done: true, value })
        })
      })
    })
  }
}

module.exports = toPull
