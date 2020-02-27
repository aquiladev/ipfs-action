# async-iterator-to-pull-stream

[![Build Status](https://travis-ci.org/alanshaw/async-iterator-to-pull-stream.svg?branch=master)](https://travis-ci.org/alanshaw/async-iterator-to-pull-stream) [![dependencies Status](https://david-dm.org/alanshaw/async-iterator-to-pull-stream/status.svg)](https://david-dm.org/alanshaw/async-iterator-to-pull-stream)

> Convert a (async) iterator to a pull stream

## Install

```sh
npm install async-iterator-to-pull-stream
```

## Usage

```js
const pull = require('pull-stream')
const toPull = require('async-iterator-to-pull-stream')

const source = (async function * () {
  const sourceValues = [1, 2, 3, 4, 5]
  for (let i = 0; i < sourceValues.length; i++) {
    yield await new Promise(resolve => setTimeout(() => resolve(sourceValues[i])))
  }
})()

pull(
  toPull.source(source),
  pull.collect((err, values) => {
    console.log(values) // 1, 2, 3, 4, 5
  })
)
```

## API

### `toPull.source(iterator)`

Convert an async `iterator` into a _source_ pull stream. Returns a pull stream that can be used as a source in a pull pipeline.

### `toPull.transform(transform)`

A `transform` is a function that takes an iterable to read from, and returns an iterable that yields (possibly mutated) data. e.g.

```js
const toPull = require('async-iterator-to-pull-stream')
const pull = require('pull-stream')

// A "pass through stream" that reads from the `source` iterable and returns an
// iterable (a generator in this case) that yields the same data.
const passThrough = source => (async function * () {
  for await (const chunk of source) {
    yield chunk // here we _could_ change the chunk or buffer it or whatever
  }
})()

pull(
  pull.values([1, 2, 3]),
  toPull.transform(passThrough),
  pull.collect((err, chunks) => {
    console.log(err, chunks) // logs: undefined, [1, 2, 3]
  })
)
```

### `toPull.sink(sink)`

Convert a `sink` to a pull stream sink. A `sink` is a function that takes an async iterable and consumes some/all of it.

```js
const toPull = require('async-iterator-to-pull-stream')
const pull = require('pull-stream')

pull(
  pull.values([1, 2, 3]),
  toPull.sink(async source => {
    for await (const value of source) {
      console.log(value) // logs: 1 then 2 then 3
    }
  })
)
```

### `toPull.duplex(duplex)`

Convert a `duplex` to a pull stream duplex. A `duplex` is just an object with two properties, `sink` (a function that takes an async iterable) and `source` (an async iterable).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/async-iterator-to-pull-stream/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
