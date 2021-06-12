# Delimited Stream

A Node.js Transform stream emitting buffered data at each delimiter instance.

[![Build status for Node.js 8.x and newer](https://github.com/sovpro/delimited-stream/workflows/Node.js%208.x%20and%20newer%20/badge.svg?branch=master)](https://github.com/sovpro/delimited-stream/commits/master)

## Constructor

The constructor requires a Buffer instance or string value representing the delimiter.

```js
const stream = new DelimitedStream (delimiter)
```

Buffered data is emitted without the delimiter by default. To keep the delimiter, pass a [truthy](https://developer.mozilla.org/en-US/docs/Glossary/Truthy) value as the second parameter.

```js
// include delimiter in data
const stream = new DelimitedStream (delimiter, true)
```

## Example

Instantiate a stream with a [newline](https://en.wikipedia.org/wiki/Newline) sequence as the delimiter.

```js
const delimiter = Buffer.from ("\r\n")
const stream = new DelimitedStream (delimiter)
stream.on ('data', (data) => {
  const line = data.toString ('utf8')
  // do stuff
})
```
