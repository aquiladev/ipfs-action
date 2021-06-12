# it-concat

[![Build Status](https://travis-ci.org/alanshaw/it-concat.svg?branch=master)](https://travis-ci.org/alanshaw/it-concat)
[![dependencies Status](https://status.david-dm.org/gh/alanshaw/it-concat.svg)](https://david-dm.org/alanshaw/it-concat)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

> Concat all buffers/strings yielded from an async iterable into a single [`BufferList`](https://www.npmjs.com/package/bl)/`string`.

## Install

```sh
npm install it-concat
```

## Usage

Concat buffers to a single [`BufferList`](https://www.npmjs.com/package/bl):

```js
const concat = require('it-concat')

const fs = require('fs')
fs.writeFileSync('./test.txt', 'Hello World!')

// Node.js Readable Streams are async iterables!
const chunks = await concat(fs.createReadStream('./test.txt'))

// chunks is a BufferList
console.log(chunks)
/*
BufferList {
  _bufs: [ <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21> ],
  length: 12
}
*/
console.log(chunks.toString())
// Hello World!
```

Concat buffers to a single _string_:

```js
const concat = require('it-concat')

const fs = require('fs')
fs.writeFileSync('./test.txt', 'Hello World!')

// Node.js Readable Streams are async iterables!
// Note that we pass `{ type: 'string' }` to tell concat that we want a string
// back and not a buffer. This is necessary because the source data is buffer(s).
const chunks = await concat(fs.createReadStream('./test.txt'), { type: 'string' })

console.log(chunks)
// Hello World!
```

Concat strings to a single string:

```js
const concat = require('it-concat')

const fs = require('fs')
fs.writeFileSync('./test.txt', 'Hello World!')

// Node.js Readable Streams are async iterables!
// Note that we don't need to pass `{ type: 'string' }` to tell concat that we
// want a string back because the source data is buffer(s).
const chunks = await concat(fs.createReadStream('./test.txt', { encoding: 'utf8' }))

console.log(chunks)
// Hello World!
```

## API

```js
const concat = require('it-concat')
```

### `concat(source, options?): Promise`

Concat all buffers or strings yielded from the async iterable `source` into a single [`BufferList`](https://www.npmjs.com/package/bl) or `string`.

* `source` (`AsyncIterable<Buffer | BufferList | string>`) - the source iterable to concat from
* `options` (`Object`) - optional options
* `options.type` (`string`) - return type of the function, pass `'string'` to recieve a string or `'buffer'` for a `BufferList`.

Returns a `Promise` that resolves to a `BufferList` or `string`.

If `options.type` is _not_ passed the type of the objects yielded from the `source` is detected and a `BufferList` or `string` is returned appropriately. If the `source` does not yield anything an empty `BufferList` is returned. If the source is expected to return strings (but may not yield anything), pass `options.type: 'string'` to ensure an empty string is returned instead of an empty `BufferList`.

## Related

* [`stream-to-it`](https://www.npmjs.com/package/stream-to-it) Convert Node.js streams to streaming iterables
* [`it-pipe`](https://www.npmjs.com/package/it-pipe) Utility to "pipe" async iterables together

[List of awesome modules for working with async iterables](https://github.com/alanshaw/it-awesome).

## Contribute

Feel free to dive in! [Open an issue](https://github.com/alanshaw/it-concat/issues/new) or submit PRs.

## License

[MIT](LICENSE) © Alan Shaw
