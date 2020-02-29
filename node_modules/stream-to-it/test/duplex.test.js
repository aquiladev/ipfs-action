const test = require('ava')
const { Duplex } = require('stream')
const pipe = require('it-pipe')
const { collect } = require('streaming-iterables')
const Fifo = require('p-fifo')
const toIterable = require('../')
const { randomInt, randomBytes } = require('./helpers/random')

test('should convert to duplex iterable', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  const fifo = new Fifo()

  const output = await pipe(
    input,
    toIterable.duplex(new Duplex({
      objectMode: true,
      write (chunk, enc, cb) {
        fifo.push(chunk).then(cb)
      },
      final (cb) {
        fifo.push(null).then(cb)
      },
      async read (size) {
        while (true) {
          const chunk = await fifo.shift()
          if (!this.push(chunk)) break
        }
      }
    })),
    collect
  )

  t.deepEqual(output, input)
})
