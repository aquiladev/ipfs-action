# js-ipld-dag-cbor <!-- omit in toc -->

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Travis CI](https://flat.badgen.net/travis/ipld/js-ipld-dag-cbor)](https://travis-ci.com/ipld/js-ipld-dag-cbor)
[![Coverage](https://coveralls.io/repos/github/ipld/js-ipld-dag-cbor/badge.svg?branch=master)](https://coveralls.io/github/ipld/js-ipld-dag-cbor?branch=master)
[![](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![](https://david-dm.org/ipld/js-ipld-dag-cbor.svg?style=flat-square)](https://david-dm.org/ipld/js-ipld-dag-cbor)
[![](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![Greenkeeper badge](https://badges.greenkeeper.io/ipld/js-ipld-dag-cbor.svg)](https://greenkeeper.io/)
![](https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D6.0.0-orange.svg?style=flat-square)

> JavaScript implementation of the [IPLD spec](https://github.com/ipfs/specs/tree/master/ipld).

## Lead Maintainer <!-- omit in toc -->

[Volker Mische](https://github.com/vmx)

## Table of Contents <!-- omit in toc -->

- [Install](#install)
  - [npm](#npm)
  - [Use in Node.js](#use-in-nodejs)
  - [Use in a browser with browserify, webpack or any other bundler](#use-in-a-browser-with-browserify-webpack-or-any-other-bundler)
  - [Use in a browser Using a script tag](#use-in-a-browser-using-a-script-tag)
- [Usage](#usage)
- [API](#api)
  - [`dagCBOR.util.serialize(obj)`](#dagcborutilserializeobj)
  - [`dagCBOR.util.deserialize(serialized)`](#dagcborutildeserializeserialized)
  - [`dagCBOR.util.configureDecoder([options])`](#dagcborutilconfiguredecoderoptions)
  - [`dagCBOR.util.cid(obj[, options,])`](#dagcborutilcidobj-options)
- [Contribute](#contribute)
- [License](#license)

## Install

### npm

```sh
> npm install ipld-dag-cbor
```

### Use in Node.js

```JavaScript
const dagCBOR = require('ipld-dag-cbor')
```

### Use in a browser with browserify, webpack or any other bundler

The code published to npm that gets loaded on require is in fact a ES5 transpiled version with the right shims added. This means that you can require it and use with your favourite bundler without having to adjust asset management process.

```JavaScript
var dagCBOR = require('ipld-dag-cbor')
```

### Use in a browser Using a script tag

Loading this module through a script tag will make the `IpldDagCbor` obj available in the global namespace.

```html
<script src="https://unpkg.com/ipld-dag-cbor/dist/index.min.js"></script>
<!-- OR -->
<script src="https://unpkg.com/ipld-dag-cbor/dist/index.js"></script>
```

## Usage

```JavaScript
const dagCBOR = require('ipld-dag-cbor')

const file = {
  name: 'hello.txt',
  size: 11
}

const serialized = dagCBOR.util.serialize(file)
console.log(`Encoded as a ${serialized.length} byte Uint8Array`)

const node = dagCBOR.util.deserialize(serialized)
console.log('Decoded as:', node)
require('assert').deepEqual(node, file) // should match

// → Encoded as a 22 byte Uint8Array
// → Decoded as: { name: 'hello.txt', size: 11 }
```

## API

### `dagCBOR.util.serialize(obj)`

Encodes an object into IPLD CBOR form, replacing any CIDs found within the object to CBOR tags (with an id of `42`).

 - `obj` (any): any object able to be serialized as CBOR

Returns the serialized node.

### `dagCBOR.util.deserialize(serialized)`

 Decodes an IPLD CBOR encoded representation, restoring any CBOR tags (id `42`) to CIDs.

  - `serialized` (`Uint8Array` or `String`): a binary blob representing an IPLD CBOR encoded object.

Returns the deserialized object.

### `dagCBOR.util.configureDecoder([options])`

Configure the underlying CBOR decoder.

Possible values in the `options` argument are:

 - `size` (`Number`, optional): the current heap size used in CBOR parsing, this may grow automatically as larger blocks are encountered up to `maxSize`. Default: `65536` (64Kb).
 - `maxSize` (`Number`, optional): the maximum size the CBOR parsing heap is allowed to grow to before `dagCBOR.util.deserialize()` returns an error. Default: `67108864` (64Mb).
 - `tags` (`Object`, optional): an object whose keys are CBOR tag numbers and values are transform functions that accept a `value` and return a decoded representation of that `value`.

 The CBOR decoder uses a heap size that is a power of two. Setting `size` to a number other than a power of two will result in a heap using the next-largest power of two.

 Calling `dagCBOR.util.configureDecoder()` with no arguments will reset to the default decoder `size`, `maxSize` and `tags`.

### `dagCBOR.util.cid(obj[, options,])`

Create a [CID](https://github.com/multiformats/js-cid) for the given unserialized object.

 - `obj` (any): any object able to be serialized as CBOR
 - `options` (`Object`):
  * `hashAlg` (`String`): a [registered multicodec](https://github.com/multiformats/multicodec/blob/master/table.csv) hash algorithm.
  * `hashLen` (`String`): an optional hash length
  * `version` (`Number`): CID version number, defaults to `1`

Returns a Promise with the created CID.

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/js-ipld-dag-cbor/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[MIT](LICENSE) © 2015 David Dias
