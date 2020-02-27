# pull-stream-to-async-iterator

[![Build Status](https://travis-ci.org/alanshaw/pull-stream-to-async-iterator.svg?branch=master)](https://travis-ci.org/alanshaw/pull-stream-to-async-iterator) [![dependencies Status](https://david-dm.org/alanshaw/pull-stream-to-async-iterator/status.svg)](https://david-dm.org/alanshaw/pull-stream-to-async-iterator)

> Convert a pull stream to an async iterator

## Install

```sh
npm install pull-stream-to-async-iterator
```

## Usage

```js
const toIterator = require('pull-stream-to-async-iterator')

const source = pull(
  pull.values([1, 2, 3, 4, 5]),
  pull.asyncMap((value, cb) => setTimeout(() => cb(null, value)))
)
const iterator = toIterator(source)

for await (const value of iterator) {
  console.log(value)
}
```

## API

### `toIterator(source)`

Convert a `source` pull stream into an async iterator. Returns an async iterator that can be used in a `for`/`await`/`of` loop.

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/pull-stream-to-async-iterator/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
