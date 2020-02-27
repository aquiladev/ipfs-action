const test = require('ava')
const pull = require('pull-stream')
const toPull = require('.')

function futureValue (value, ms) {
  return new Promise((resolve, reject) => setTimeout(() => resolve(value), ms))
}

test.cb('should convert async iterator to pull stream', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const iterator = async function * () {
    for (let i = 0; i < sourceValues.length; i++) {
      yield await futureValue(sourceValues[i], sourceValues[i])
    }
  }

  pull(
    toPull(iterator()),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, sourceValues)
      t.end()
    })
  )
})

test.cb('should return mid way through async iterator source', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const iterator = async function * () {
    for (let i = 0; i < sourceValues.length; i++) {
      yield await futureValue(sourceValues[i], sourceValues[i])
    }
  }

  pull(
    toPull(iterator()),
    pull.take(1),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, [sourceValues[0]])
      t.end()
    })
  )
})

test.cb('should convert iterator to pull stream', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const iterator = function * () {
    for (let i = 0; i < sourceValues.length; i++) {
      yield sourceValues[i]
    }
  }

  pull(
    toPull(iterator()),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, sourceValues)
      t.end()
    })
  )
})

test.cb('should handle error in iterator', t => {
  const sourceValues = [1, 2, 3, 4, new Error('Boom!')]

  const iterator = function * () {
    for (let i = 0; i < sourceValues.length; i++) {
      if (sourceValues[i] instanceof Error) throw sourceValues[i]
      yield sourceValues[i]
    }
  }

  pull(
    toPull(iterator()),
    pull.collect((err, values) => {
      t.truthy(err)
      t.deepEqual(values, sourceValues.slice(0, -1))
      t.end()
    })
  )
})

test.cb('should accept iterable', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  pull(
    toPull(sourceValues),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, sourceValues)
      t.end()
    })
  )
})

test.cb('should accept async iterable', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const iterator = async function * () {
    for (let i = 0; i < sourceValues.length; i++) {
      yield await futureValue(sourceValues[i], sourceValues[i])
    }
  }

  pull(
    toPull({ [Symbol.asyncIterator]: () => iterator() }),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, sourceValues)
      t.end()
    })
  )
})

test.cb('should convert async iterable through stream to pull through stream', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const passThrough = source => (async function * () {
    for await (const chunk of source) {
      yield chunk // here we _could_ change the chunk or buffer it or whatever
    }
  })()

  pull(
    pull.values(sourceValues),
    toPull.through(passThrough),
    pull.collect((err, values) => {
      t.falsy(err)
      t.deepEqual(values, sourceValues)
      t.end()
    })
  )
})

test.cb('should handle error in async iterable through stream', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  const passThrough = source => (async function * () {
    for await (const _ of source) { // eslint-disable-line no-unused-vars
      throw new Error('boom')
    }
  })()

  pull(
    pull.values(sourceValues),
    toPull.through(passThrough),
    pull.collect((err, values) => {
      t.truthy(err)
      t.is(err.message, 'boom')
      t.end()
    })
  )
})

test.cb('should convert async iterable sink to pull sink', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  pull(
    pull.values(sourceValues),
    toPull.sink(async source => {
      let i = 0
      for await (const value of source) {
        t.is(value, sourceValues[i])
        i++
      }
      t.is(i, sourceValues.length)
      t.end()
    })
  )
})

test.cb('should return mid way through async iterable sink', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  pull(
    pull.values(sourceValues),
    toPull.sink(async source => {
      await source.next()
      await source.return()
      t.end()
    })
  )
})

test.cb('should throw mid way through async iterable sink', t => {
  const sourceValues = [1, 2, 3, 4, 5]

  pull(
    pull.values(sourceValues),
    toPull.sink(async source => {
      await source.next()
      await t.throwsAsync(source.throw(new Error('boom')))
      t.end()
    })
  )
})
