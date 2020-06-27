<a name="0.15.3"></a>
## [0.15.3](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.15.2...v0.15.3) (2020-06-10)


### Features

* serialize Uint8Array as binary (like Buffer) ([95f6bda](https://github.com/ipld/js-ipld-dag-cbor/commit/95f6bda))



<a name="0.15.2"></a>
## [0.15.2](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.15.1...v0.15.2) (2020-03-27)


### Bug Fixes

* remove node globals ([#124](https://github.com/ipld/js-ipld-dag-cbor/issues/124)) ([7acfeae](https://github.com/ipld/js-ipld-dag-cbor/commit/7acfeae))
* **package:** update cids to version 0.8.0 ([bc6ac54](https://github.com/ipld/js-ipld-dag-cbor/commit/bc6ac54))



<a name="0.15.1"></a>
## [0.15.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.15.0...v0.15.1) (2020-01-13)


### Bug Fixes

* **package:** update multicodec to version 1.0.0 ([d1d78a0](https://github.com/ipld/js-ipld-dag-cbor/commit/d1d78a0))
* **package:** update multihashing-async to version 0.8.0 ([b8d4a55](https://github.com/ipld/js-ipld-dag-cbor/commit/b8d4a55))



<a name="0.15.0"></a>
# [0.15.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.14.0...v0.15.0) (2019-05-10)


### Bug Fixes

* **package:** update cids to version 0.7.0 ([2dc3378](https://github.com/ipld/js-ipld-dag-cbor/commit/2dc3378))


### BREAKING CHANGES

* **package:** Returned v1 CIDs now default to base32 encoding

Previous versions returned a base58 encoded string when `toString()`/
`toBaseEncodedString()` was called on a CIDv1. It now returns a base32
encoded string.



<a name="0.14.0"></a>
# [0.14.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.13.1...v0.14.0) (2019-05-08)


### Bug Fixes

* make cbor Decoder configurable ([#90](https://github.com/ipld/js-ipld-dag-cbor/issues/90)) ([dfb9137](https://github.com/ipld/js-ipld-dag-cbor/commit/dfb9137))
* remove console.log statement ([a413cb2](https://github.com/ipld/js-ipld-dag-cbor/commit/a413cb2))
* typo in travis badge ([94122f0](https://github.com/ipld/js-ipld-dag-cbor/commit/94122f0))
* **package:** update cids to version 0.6.0 ([1d507f7](https://github.com/ipld/js-ipld-dag-cbor/commit/1d507f7))
* **package:** update multihashing-async to version 0.6.0 ([b328072](https://github.com/ipld/js-ipld-dag-cbor/commit/b328072))


### Features

* allow decoder heap to grow dynamically ([1f7b7f1](https://github.com/ipld/js-ipld-dag-cbor/commit/1f7b7f1)), closes [#73](https://github.com/ipld/js-ipld-dag-cbor/issues/73)
* new IPLD Format API ([cfc8519](https://github.com/ipld/js-ipld-dag-cbor/commit/cfc8519))


### BREAKING CHANGES

* The API is now async/await based

There are numerous changes, the most significant one is that the API
is no longer callback based, but it using async/await.

For the full new API please see the [IPLD Formats spec].

[IPLD Formats spec]: https://github.com/ipld/interface-ipld-format



<a name="0.13.1"></a>
## [0.13.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.13.0...v0.13.1) (2019-01-08)


### Bug Fixes

* reduce bundle size ([#87](https://github.com/ipld/js-ipld-dag-cbor/issues/87)) ([ab637f3](https://github.com/ipld/js-ipld-dag-cbor/commit/ab637f3))


### Features

* support the hashLen option of multihashing ([#83](https://github.com/ipld/js-ipld-dag-cbor/issues/83)) ([9ffb5e2](https://github.com/ipld/js-ipld-dag-cbor/commit/9ffb5e2))



<a name="0.13.0"></a>
# [0.13.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.12.1...v0.13.0) (2018-10-01)


### Bug Fixes

* resolve falsy values ([0a49705](https://github.com/ipld/js-ipld-dag-cbor/commit/0a49705))


### Features

* serialize and de-serialize CID instances ([8585d65](https://github.com/ipld/js-ipld-dag-cbor/commit/8585d65))


### BREAKING CHANGES

* return values from de-serializer are now CID instances.
Serializer still supports old link objects.



<a name="0.12.1"></a>
## [0.12.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.12.0...v0.12.1) (2018-06-29)


### Bug Fixes

* pass serialized blob to util.cid ([#67](https://github.com/ipld/js-ipld-dag-cbor/issues/67)) ([1ec7744](https://github.com/ipld/js-ipld-dag-cbor/commit/1ec7744))


### Features

* add defaultHashAlg ([#65](https://github.com/ipld/js-ipld-dag-cbor/issues/65)) ([e095ef5](https://github.com/ipld/js-ipld-dag-cbor/commit/e095ef5))
* add util.cid options ([#66](https://github.com/ipld/js-ipld-dag-cbor/issues/66)) ([1aed60e](https://github.com/ipld/js-ipld-dag-cbor/commit/1aed60e))


### BREAKING CHANGES

* the first argument is now the serialized output NOT the dag node.
See https://github.com/ipld/interface-ipld-format/issues/32



<a name="0.12.0"></a>
# [0.12.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.11.2...v0.12.0) (2018-02-12)


### Bug Fixes

* use binary blobs directly ([5321d6a](https://github.com/ipld/js-ipld-dag-cbor/commit/5321d6a))


### BREAKING CHANGES

* Everyone calling the functions of `resolve` need to
pass in the binary data instead of an IPFS block.

So if your input is an IPFS block, the code changes from

    resolver.resolve(block, path, (err, result) => {…}

to

    resolver.resolve(block.data, path, (err, result) => {…}



<a name="0.12.0"></a>
# [0.12.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.11.2...v0.12.0) (2018-02-12)


### Bug Fixes

* use binary blobs directly ([5321d6a](https://github.com/ipld/js-ipld-dag-cbor/commit/5321d6a))


### BREAKING CHANGES

* Everyone calling the functions of `resolve` need to
pass in the binary data instead of an IPFS block.

So if your input is an IPFS block, the code changes from

    resolver.resolve(block, path, (err, result) => {…}

to

    resolver.resolve(block.data, path, (err, result) => {…}



<a name="0.11.2"></a>
## [0.11.2](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.11.1...v0.11.2) (2017-11-07)


### Features

* next Aegir (fix tests in the middle) ([#53](https://github.com/ipld/js-ipld-dag-cbor/issues/53)) ([02940a0](https://github.com/ipld/js-ipld-dag-cbor/commit/02940a0))



<a name="0.11.1"></a>
## [0.11.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.11.0...v0.11.1) (2017-04-04)



<a name="0.11.0"></a>
# [0.11.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.10.1...v0.11.0) (2017-03-21)


### Features

* use new block api ([4ec9228](https://github.com/ipld/js-ipld-dag-cbor/commit/4ec9228))



<a name="0.10.1"></a>
## [0.10.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.10.0...v0.10.1) (2017-03-16)



<a name="0.10.0"></a>
# [0.10.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.9.1...v0.10.0) (2017-03-13)



<a name="0.9.1"></a>
## [0.9.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.9.0...v0.9.1) (2017-02-09)



<a name="0.9.0"></a>
# [0.9.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.6...v0.9.0) (2017-02-02)



<a name="0.8.6"></a>
## [0.8.6](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.5...v0.8.6) (2017-01-31)


### Features

* CBOR TAG ([#38](https://github.com/ipld/js-ipld-dag-cbor/issues/38)) ([13323a2](https://github.com/ipld/js-ipld-dag-cbor/commit/13323a2))



<a name="0.8.5"></a>
## [0.8.5](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.4...v0.8.5) (2017-01-29)



<a name="0.8.4"></a>
## [0.8.4](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.3...v0.8.4) (2017-01-29)



<a name="0.8.3"></a>
## [0.8.3](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.2...v0.8.3) (2016-12-11)


### Features

* switch to borc ([#31](https://github.com/ipld/js-ipld-dag-cbor/issues/31)) ([3164a81](https://github.com/ipld/js-ipld-dag-cbor/commit/3164a81)), closes [#23](https://github.com/ipld/js-ipld-dag-cbor/issues/23)



<a name="0.8.2"></a>
## [0.8.2](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.1...v0.8.2) (2016-12-01)



<a name="0.8.1"></a>
## [0.8.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.8.0...v0.8.1) (2016-11-21)



<a name="0.8.0"></a>
# [0.8.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.7.1...v0.8.0) (2016-11-03)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.7.0...v0.7.1) (2016-10-30)



<a name="0.7.0"></a>
# [0.7.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.6.0...v0.7.0) (2016-10-26)


### Bug Fixes

* add array handling to .tree ([656ad84](https://github.com/ipld/js-ipld-dag-cbor/commit/656ad84))
* complete migration to async API ([2e91d7c](https://github.com/ipld/js-ipld-dag-cbor/commit/2e91d7c))
* out of scope traversal for 2 or more levels deep ([b7a565b](https://github.com/ipld/js-ipld-dag-cbor/commit/b7a565b))


### Features

* add util.serialize, util.deserialize and util.cid ([fcc2ab5](https://github.com/ipld/js-ipld-dag-cbor/commit/fcc2ab5))
* resolve out of scope ([bea41ea](https://github.com/ipld/js-ipld-dag-cbor/commit/bea41ea))
* resolver.resolve within scope ([1158fa4](https://github.com/ipld/js-ipld-dag-cbor/commit/1158fa4))
* resolver.tree and resolver.multicodec ([21ddefc](https://github.com/ipld/js-ipld-dag-cbor/commit/21ddefc))
* use async interfaces ([48eb863](https://github.com/ipld/js-ipld-dag-cbor/commit/48eb863))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.4.0...v0.6.0) (2016-05-22)


### Bug Fixes

* **cbor:** Typo in lodash.clonedeep ([2f617b0](https://github.com/ipld/js-ipld-dag-cbor/commit/2f617b0))
* Add missing babel-runtime dep ([5c11ce8](https://github.com/ipld/js-ipld-dag-cbor/commit/5c11ce8))
* correct references in package.json ([12f18ab](https://github.com/ipld/js-ipld-dag-cbor/commit/12f18ab))
* Ensure inputs are not modified ([b20f90b](https://github.com/ipld/js-ipld-dag-cbor/commit/b20f90b))


### Features

* upgrade to latest spec ([7375f99](https://github.com/ipld/js-ipld-dag-cbor/commit/7375f99))



<a name="0.4.0"></a>
# [0.4.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.3.1...v0.4.0) (2016-03-22)



<a name="0.3.1"></a>
## [0.3.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.3.0...v0.3.1) (2015-11-13)



<a name="0.3.0"></a>
# [0.3.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.2.1...v0.3.0) (2015-11-13)



<a name="0.2.1"></a>
## [0.2.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.2.0...v0.2.1) (2015-10-29)



<a name="0.2.0"></a>
# [0.2.0](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.1.3...v0.2.0) (2015-09-14)



<a name="0.1.3"></a>
## [0.1.3](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.1.2...v0.1.3) (2015-09-04)



<a name="0.1.2"></a>
## [0.1.2](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.1.1...v0.1.2) (2015-09-04)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/ipld/js-ipld-dag-cbor/compare/v0.1.0...v0.1.1) (2015-09-01)



<a name="0.1.0"></a>
# 0.1.0 (2015-09-01)



