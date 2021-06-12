# js-ipld-dag-pb <!-- omit in toc -->

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![Travis CI](https://flat.badgen.net/travis/ipld/js-ipld-dag-pb)](https://travis-ci.com/ipld/js-ipld-dag-pb)
[![Coverage Status](https://coveralls.io/repos/github/ipld/js-ipld-dag-pb/badge.svg?branch=master)](https://coveralls.io/github/ipld/js-ipld-dag-pb?branch=master)
[![Dependency Status](https://david-dm.org/ipld/js-ipld-dag-pb.svg?style=flat-square)](https://david-dm.org/ipld/js-ipld-dag-pb)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/feross/standard)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
[![Greenkeeper badge](https://badges.greenkeeper.io/ipld/js-ipld-dag-pb.svg)](https://greenkeeper.io/)
![](https://img.shields.io/badge/npm-%3E%3D3.0.0-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D4.0.0-orange.svg?style=flat-square)

> JavaScript Implementation of the IPLD Format MerkleDAG Node in Protobuf. In addition to the IPLD Format methods, this module also provides an API for creating the nodes and manipulating them (adding and removing links, etc).

## Lead Maintainer <!-- omit in toc -->

[Volker Mische](https://github.com/vmx)

## Table of Contents <!-- omit in toc -->

- [Install](#install)
- [Usage](#usage)
  - [Examples](#examples)
    - [Create a DAGNode](#create-a-dagnode)
    - [Add and remove a Link](#add-and-remove-a-link)
- [API](#api)
  - [DAGNode functions](#dagnode-functions)
    - [DAGNode constructor](#dagnode-constructor)
  - [DAGNode instance methods and properties](#dagnode-instance-methods-and-properties)
    - [`node.Data`](#nodedata)
    - [`node.Links`](#nodelinks)
    - [`node.size`](#nodesize)
    - [`node.toJSON()`](#nodetojson)
    - [`node.toString()`](#nodetostring)
    - [`node.toDAGLink()`](#nodetodaglink)
    - [`node.addLink(link)`](#nodeaddlinklink)
    - [`node.rmLink(nameOrCid)`](#nodermlinknameorcid)
    - [`node.serialize()`](#nodeserialize)
  - [DAGLink functions](#daglink-functions)
    - [DAGLink constructor](#daglink-constructor)
  - [DAGLink instance methods and properties](#daglink-instance-methods-and-properties)
    - [`link.Name`](#linkname)
    - [`link.Tsize`](#linktsize)
    - [`link.Hash`](#linkhash)
    - [`link.toJSON()`](#linktojson)
    - [`link.toString()`](#linktostring)
  - [IPLD Format Specifics - Local (node/block scope) resolver](#ipld-format-specifics---local-nodeblock-scope-resolver)
    - [`dagPB.resolver.resolve`](#dagpbresolverresolve)
    - [`dagPB.resolver.tree`](#dagpbresolvertree)
  - [IPLD Format Specifics - util](#ipld-format-specifics---util)
  - [`dagPB.util.cid`](#dagpbutilcid)
  - [`dagPB.util.serialize`](#dagpbutilserialize)
  - [`dagPB.util.deserialize`](#dagpbutildeserialize)
- [Contribute](#contribute)
- [License](#license)

## Install

```bash
> npm install ipld-dag-pb --save
```

## Usage

```JavaScript
const dagPB = require('ipld-dag-pb')

// IPLD Format specifics
dagPB.resolver
dagPB.util
```

### Examples

#### Create a DAGNode

```JavaScript
const node1 = new DAGNode(new TextEncoder('utf8').encode('some data'))

// node2 will have the same data as node1
const node2 = new DAGNode('some data')
```

#### Add and remove a Link

```JavaScript
const link = {
  Name: 'I am a link',
  Hash: 'QmHash..',
  Tsize: 42
}

node.addLink(link)
console.log('with link', node.toJSON())

nodeA.rmLink('I am a link')
console.log('now without link', node.toJSON())
```

## API

### DAGNode functions

DAGNodes are immutable objects, in order to manipulate them you have to follow a function approach of applying function and getting new instances of the given DAGNode.

You can incude it in your project with:

```JavaScript
const dagPB = require('ipld-dag-pb')
const DAGNode = dagPB.DAGNode
```

#### DAGNode constructor

- `data` - type: Uint8Array or String
- `links`- (optional) type: Array of DAGLink instances or Array of DAGLink instances in its json format (link.toJSON)
- `serializedSize`- (optional) type: Number of bytes the serialized node has. If none is given, it will automatically be calculated.

Create a DAGNode.

```JavaScript
const dagNode = new DAGNode('data', links)
```

links can be a single or an array of DAGLinks instances or objects with the following pattern

```JavaScript
{
  Name: '<some name>',
  Hash: '<some cid>',
  TSize: <sizeInBytes>
}
```

### DAGNode instance methods and properties

You have the following methods and properties available in every DAGNode instance.

#### `node.Data`

#### `node.Links`

An array of JSON Objects with fields named `Hash`, `Name`, and `Tsize`.

#### `node.size`

Size of the node, in bytes

#### `node.toJSON()`

#### `node.toString()`

#### `node.toDAGLink()`

- `options` - (optional) type: Object. Currently the only option is `name` to specify a named link.

Converts a `DAGNode` into a `DAGLink`.

```JavaScript
const node = new DAGNode('some data')
const link = node.toDAGLink()
// Named link
const link = node.toDAGLink({ name: 'name-of-the-link' })
```

#### `node.addLink(link)`

- `link` - type: DAGLink or DAGLink in its json format

Creates a link on node A. Modifies the node.

`link` can be:
- DAGLink instance
- DAGNode instance
- Object with the following properties:

```JavaScript
const link = {
  Name: '<some string>', // optional
  Tsize: <size in bytes>,
  Hash: <cid> // can be a String CID, CID buffer or CID object
}

node.addLink(link)
```

#### `node.rmLink(nameOrCid)`

- `nameOrCid` - type: String, CID object or CID buffer

Removes a link from the node by name. Modifies the node.

```JavaScript
node.rmLink('Link1')
```

#### `node.serialize()`

Serialize the DAGNode instance to its portable binary format. Yields the same result as `dagPB.util.serialize(node)`. Returns a `Uint8Array`.

### DAGLink functions

Following the same pattern as [`DAGNode functions`]() above, DAGLink also offers a function for its creation.

You can incude it in your project with:

```JavaScript
const dagPB = require('ipld-dag-pb')
const DAGLink = dagPB.DAGLink
```

#### DAGLink constructor

```JavaScript
// link is a DAGLink instance
const link = new DAGLink(
  'link-to-file',  // name of the link (can be empty)
  10,              // size in bytes
  'QmSomeHash...', // can be CID object, CID buffer or string
)
```

### DAGLink instance methods and properties

#### `link.Name`

#### `link.Tsize`

#### `link.Hash`

#### `link.toJSON()`

#### `link.toString()`

### [IPLD Format Specifics](https://github.com/ipld/interface-ipld-format) - Local (node/block scope) resolver

> See: https://github.com/ipld/interface-ipld-format#local-resolver-methods

#### `dagPB.resolver.resolve`

#### `dagPB.resolver.tree`

### [IPLD Format Specifics](https://github.com/ipld/interface-ipld-format) - util

> See: https://github.com/ipld/interface-ipld-format#ipld-format-utils

### `dagPB.util.cid`

### `dagPB.util.serialize`

Serialize the DAGNode instance to its portable binary format. Yields the same result as `node.serialize()`. Returns a `Uint8Array`.

### `dagPB.util.deserialize`

Deserialize a DAGNode instance from its portable binary format. Returns a DAGNode.

## Contribute

Please contribute! [Look at the issues](https://github.com/ipld/js-ipld-dag-pb/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

[ISC](LICENSE) © 2016 Protocol Labs Inc.
