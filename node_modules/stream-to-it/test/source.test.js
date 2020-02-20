const test = require('ava')
const { Readable } = require('stream')
const toIterable = require('../')
const { collect } = require('streaming-iterables')
const { randomInt, randomBytes } = require('./helpers/random')

test('should convert to source iterable', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  let i = 0
  const readable = new Readable({
    objectMode: true,
    read () {
      while (true) {
        const data = input[i++] || null
        if (!this.push(data)) break
      }
    }
  })
  const output = await collect(toIterable.source(readable))
  t.deepEqual(input, output)
})

test('should convert browser ReadableStream to source iterable', async t => {
  const input = Array.from(Array(randomInt(5, 10)), () => randomBytes(1, 512))
  let i = 0

  // Like a Response object you get from a call to fetch() in the browser
  const response = {
    body: {
      getReader () {
        return {
          read () {
            const value = input[i++]
            return value == null ? { done: true } : { value }
          },
          releaseLock () {}
        }
      }
    }
  }
  const output = await collect(toIterable.source(response.body))
  t.deepEqual(input, output)
})
