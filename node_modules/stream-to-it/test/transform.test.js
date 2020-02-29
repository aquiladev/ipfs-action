const test = require('ava')
const { Transform } = require('stream')
const { collect } = require('streaming-iterables')
const pipe = require('it-pipe')
const bl = require('bl')
const toIterable = require('../')
const { randomInt, randomBytes } = require('./helpers/random')

test('should convert to transform iterable', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  const suffix = Buffer.from(`${Date.now()}`)

  const output = await pipe(
    input,
    // Transform every chunk to have a "suffix"
    toIterable.transform(new Transform({
      transform (chunk, enc, cb) {
        cb(null, Buffer.concat([chunk, suffix]))
      }
    })),
    collect
  )

  t.deepEqual(
    bl(input.map(d => Buffer.concat([d, suffix]))).slice(),
    bl(output).slice()
  )
})

test('should transform single chunk into multiple chunks', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  const separator = Buffer.from(`${Date.now()}`)

  const output = await pipe(
    input,
    // Transform every chunk to have a "suffix"
    toIterable.transform(new Transform({
      transform (chunk, enc, cb) {
        this.push(chunk)
        setTimeout(() => {
          this.push(separator)
          cb()
        })
      }
    })),
    collect
  )

  t.deepEqual(
    bl(input.map(d => Buffer.concat([d, separator]))).slice(),
    bl(output).slice()
  )
})

test('should transform single chunk into no chunks', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))

  const output = await pipe(
    input,
    toIterable.transform(new Transform({
      transform (chunk, enc, cb) {
        cb()
      }
    })),
    collect
  )

  t.is(output.length, 0)
})

test('should error the iterator when transform stream errors', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  let i = 0

  const err = await t.throwsAsync(
    pipe(
      input,
      toIterable.transform(new Transform({
        transform (chunk, enc, cb) {
          i++
          if (i > 2) return cb(new Error('boom'))
          cb(null, chunk)
        }
      })),
      collect
    )
  )

  t.is(err.message, 'boom')
})
