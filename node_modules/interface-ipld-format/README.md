# interface-ipld-format <!-- omit in toc -->

[![](https://img.shields.io/badge/made%20by-Protocol%20Labs-blue.svg?style=flat-square)](http://ipn.io)
[![](https://img.shields.io/badge/freenode-%23ipfs-blue.svg?style=flat-square)](http://webchat.freenode.net/?channels=%23ipfs)
[![](https://img.shields.io/badge/project-IPLD-blue.svg?style=flat-square)](http://github.com/ipld/ipld)
[![standard-readme compliant](https://img.shields.io/badge/standard--readme-OK-green.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

> A interface you can follow to implement a valid IPLD format, resolvable through the IPLD Resolver (available in IPFS)

## Table of Contents <!-- omit in toc -->

- [Background](#background)
  - [Modules that implement the interface](#modules-that-implement-the-interface)
  - [Badge](#badge)
- [Definitions](#definitions)
- [API](#api)
  - [IPLD format utils](#ipld-format-utils)
    - [`util.serialize(IpldNode)`](#utilserializeipldnode)
    - [`util.deserialize(binaryBlob)`](#utildeserializebinaryblob)
    - [`util.cid(binaryBlob[, options])`](#utilcidbinaryblob-options)
  - [Local resolver methods](#local-resolver-methods)
    - [`resolver.resolve(binaryBlob, path)`](#resolverresolvebinaryblob-path)
    - [`resolver.tree(binaryBlob)`](#resolvertreebinaryblob)
  - [Properties](#properties)
    - [`defaultHashAlg`](#defaulthashalg)
    - [`codec`](#codec)
- [Maintainers](#maintainers)
- [Contribute](#contribute)
- [License](#license)

## Background

The primary goal of this module is to define an interface that IPLD formats can implement and attach to any IPLD Resolver. The API is presented with both Node.js and Go primitives. However, there are no actual limitations keeping it from being extended for any other language, pushing forward cross compatibility and interoperability through different stacks.

### Modules that implement the interface

- [JavaScript ipld-dag-pb](https://github.com/ipld/js-ipld-dag-pb)
- [JavaScript ipld-dag-cbor](https://github.com/ipld/js-ipld-dag-cbor)
- [JavaScript ipld-ethereum](https://github.com/ipld/js-ipld-ethereum)
- [JavaScript ipld-bitcoin](https://github.com/ipld/js-ipld-bitcoin)
- [JavaScript ipld-zcash](https://github.com/ipld/js-ipld-zcash)
- [JavaScript ipld-git](https://github.com/ipld/js-ipld-git)
- [JavaScript ipld-raw](https://github.com/ipld/js-ipld-raw)

Send in a PR if you find or write one!

### Badge

Include this badge in your readme if you make a new module that implements interface-ipld-format API.

![](/img/badge.png)

## Definitions

- **IPLD Node**: A JavaScript object where all values conform to the [IPLD Data Model](https://github.com/ipld/specs/blob/master/IPLD-Data-Model-v1.md).

## API

A valid (read: that follows this interface) IPLD format implementation the following API.

IPLD Format APIs are restricted to a single IPLD Node, they never access any linked IPLD Nodes.

### IPLD format utils

#### `util.serialize(IpldNode)`

> Serialize an IPLD Node into a binary blob.

`IpldNode` is a previously deserialized binary blob.

Returns a [Uint8Array] with the serialized version of the given IPLD Node.

#### `util.deserialize(binaryBlob)`

> Deserialize a binary blob into an IPLD Node.

The result is a JavaScript object. Its fields are the public API that can be resolved through. It’s up to the format to add convenient methods for manipulating the data.

All enumerable properties (the ones that are returned by a `Object.keys()` call) of the deserialized object are considered for resolving IPLD Paths. They must only return values whose type is one of the [IPLD Data Model](https://github.com/ipld/specs/blob/master/IPLD-Data-Model-v1.md).

The result must be able to be serialized with a `serialize()` call. Deserializing and serializing a `binaryBlob` (`await serialize(await deserialize(binaryBlob))`) needs to result in data that is byte-identical to the input `binaryBlob`.

#### `util.cid(binaryBlob[, options])`

> Calculate the CID of the binary blob.

Possible `options` are:
  - `cidVersion` (`number`, default: 1): the CID version to be used
  - `hashAlg` (`Multicodec`, default: the one the format specifies): the hash algorithm to be used

This can be used to verify that some data actually has a certain CID.

Returns a Promise containing the calculated CID of the given binary blob.

### Local resolver methods

#### `resolver.resolve(binaryBlob, path)`

> Resolves a path within the blob, returns the value and the partial missing path. This way the `js-ipld` can continue to resolve in case the value is a link.

Returns a `ResolverResult`, which is an Object with the following keys:

  - `value` (`IPLD Data`): the value resolved, whose type is one of the [IPLD Data model](https://github.com/ipld/specs/blob/master/IPLD-Data-Model-v1.md)
  - remainderPath (`string`): the remaining path that was not resolved under block scope

If `path` is the root `/`, the result is a nested object that contains all paths that `tree()` returns. The values are the same as accessing them directly with the full path. Example:

`tree()` returns in iterator with those values:

```JSON
["author/name", "author/email"]
```

`await resolve(binaryblob, "/")` would then have as a result:

```JSON
{
  "value": {
    "author": {
      "name": "vmx",
      "email": "vmx@example.com"
    }
  },
  "remainderPath": ""
}
```

If `resolve()` is called with the root path (`/`), then the `value` of the `ResolverResult` will equal the return value of a `deserialize()` call.

Numbers within a path are interpreted as an array.

#### `resolver.tree(binaryBlob)`

> Returns all the paths available in this blob

Returns an Iterable where each item is a path that can be resolved, e.g. `["/foo", "/bar", "/author/name", ...]`.

### Properties

#### `defaultHashAlg`

> Default hash algorithm of the format.

Most formats have one specific hash algorithm, e.g. Bitcoin’s is `dbl-sha2-256`. CBOR can be used with any hash algorithm, though the default in the IPFS world is `sha256`. `defaultHashAlg` is used in the `util.cid()` call if no hash algorithm is given. The value of `defaultHashAlg` is of type `Multicodec` should be one code defined in the [Multihash Table](https://github.com/multiformats/multihash#table-for-multihash).

#### `codec`

> Identifier for the format implementation.

The `codec` property of type `Multicodec` is used to register a format implementation in IPLD. It should be one of the codes specified in the [Multicodec Table](https://github.com/multiformats/multicodec#multicodec-table).


## Maintainers

Captain: [@diasdavid](https://github.com/diasdavid).

## Contribute

Feel free to join in. All welcome. Open an [issue](https://github.com/ipld/interface-ipld-format/issues)!

Check out our [contributing document](https://github.com/ipld/ipld/blob/master/contributing.md) for more information on how we work, and about contributing in general. Please be aware that all interactions related to IPLD are subject to the IPFS [Code of Conduct](https://github.com/ipfs/community/blob/master/code-of-conduct.md).

Small note: If editing the README, please conform to the [standard-readme](https://github.com/RichardLitt/standard-readme) specification.

## License

This repository is only for documents. These are licensed under a [CC-BY 3.0 Unported](LICENSE) License © 2016 Protocol Labs Inc. Any code is licensed under a [MIT](MIT-LICENSE) © 2016 Protocol Labs Inc.

[UnixFS]: https://github.com/ipfs/specs/tree/master/unixfs
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
