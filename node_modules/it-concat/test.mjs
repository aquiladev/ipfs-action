import test from 'ava'
import randomBytes from 'random-bytes'
import randomInt from 'random-int'
import BufferList from 'bl/BufferList.js'
import concat from './index.js'

const randomBuffers = max => Promise.all(Array.from(Array(max), () => randomBytes(randomInt(1, 128))))
const randomStrings = async max => {
  const bufs = await randomBuffers(max)
  return bufs.map(b => b.toString('hex'))
}

test('should concat buffers', async t => {
  const input = await randomBuffers(10)
  const output = await concat(input)
  t.deepEqual(output.slice(), Buffer.concat(input))
})

test('should concat buffer lists', async t => {
  const input = (await randomBuffers(10)).map(b => BufferList(b))
  const output = await concat(input)
  t.deepEqual(output.slice(), BufferList(input).slice())
})

test('should concat no buffers', async t => {
  const output = await concat([])
  t.deepEqual(output.slice(), Buffer.alloc(0))
})

test('should concat strings', async t => {
  const input = await randomStrings(10)
  const output = await concat(input)
  t.deepEqual(output, input.join(''))
})

test('should concat buffers to strings', async t => {
  const input = (await randomStrings(10)).map(s => Buffer.from(s))
  const output = await concat(input, { type: 'string' })
  t.deepEqual(output, Buffer.concat(input).toString())
})

test('should concat strings to buffers', async t => {
  const input = await randomStrings(10)
  const output = await concat(input, { type: 'buffer' })
  t.deepEqual(output.toString(), input.join(''))
})

test('should concat no strings', async t => {
  const output = await concat([], { type: 'string' })
  t.deepEqual(output, '')
})

test('should throw for invalid type', async t => {
  const input = await randomBuffers(10)
  const err = await t.throwsAsync(concat(input, { type: 'donkey' }))
  t.is(err.message, 'invalid type "donkey"')
})

test('should concat buffers as buffers', async t => {
  const input = [Buffer.from('a0', 'hex')]
  const output = await concat(input, { type: 'buffer' })
  t.is(output.toString('hex'), 'a0')
})
