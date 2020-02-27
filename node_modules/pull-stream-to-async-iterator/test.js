const test = require('ava')
const pull = require('pull-stream')
const toIterator = require('.')

test('should convert sync to async iterator', async t => {
  const sourceValues = [1, 2, 3, 4, 5]
  const source = pull.values(sourceValues)
  const it = toIterator(source)

  let values = []
  for await (const value of it) {
    values.push(value)
  }

  t.deepEqual(values, sourceValues)
})

test('should convert async to async iterator', async t => {
  const sourceValues = [1, 2, 3, 4, 5]
  const source = pull(
    pull.values(sourceValues),
    pull.asyncMap((value, cb) => {
      setTimeout(() => cb(null, value), value)
    })
  )
  const it = toIterator(source)

  let values = []
  for await (const value of it) {
    values.push(value)
  }

  t.deepEqual(values, sourceValues)
})

test('should handle error in stream', async t => {
  const sourceValues = [1, 2, new Error('BOOM')]
  const source = pull(
    pull.values(sourceValues),
    pull.asyncMap((value, cb) => {
      setTimeout(() => {
        if (value instanceof Error) return cb(value)
        cb(null, value)
      }, value)
    })
  )
  const it = toIterator(source)

  let values = []

  try {
    for await (const value of it) {
      values.push(value)
    }
    t.fail('expected to error')
  } catch (err) {}

  t.deepEqual(values, sourceValues.slice(0, -1))
})
