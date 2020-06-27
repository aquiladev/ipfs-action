<a name="5.0.0"></a>
# [5.0.0](https://github.com/ipld/js-ipld-raw/compare/v4.0.1...v5.0.0) (2020-05-06)


### Bug Fixes

* **package:** update cids to version 0.8.0 ([94e1db9](https://github.com/ipld/js-ipld-raw/commit/94e1db9))
* issue [#16](https://github.com/ipld/js-ipld-raw/issues/16) - Throw error on resolving non-root path ([#43](https://github.com/ipld/js-ipld-raw/issues/43)) ([a5b53be](https://github.com/ipld/js-ipld-raw/commit/a5b53be))


### BREAKING CHANGES

* non-root paths throw an error

Prior to this change a call to the resolver with a path like this:

    resolver.resolve(blob, '/a/b/c/d')

would just return the `blob` and an empty remainder path.

With this commit, it will throw an Error as there is no such path.



<a name="4.0.1"></a>
## [4.0.1](https://github.com/ipld/js-ipld-raw/compare/v4.0.0...v4.0.1) (2020-01-13)


### Bug Fixes

* **package:** update multicodec to version 1.0.0 ([fdbeed6](https://github.com/ipld/js-ipld-raw/commit/fdbeed6))
* **package:** update multihashing-async to version 0.8.0 ([60c06c1](https://github.com/ipld/js-ipld-raw/commit/60c06c1))



<a name="4.0.0"></a>
# [4.0.0](https://github.com/ipld/js-ipld-raw/compare/v3.0.0...v4.0.0) (2019-05-10)


### Bug Fixes

* **package:** update cids to version 0.7.0 ([0feb2fa](https://github.com/ipld/js-ipld-raw/commit/0feb2fa))


### BREAKING CHANGES

* **package:** Returned v1 CIDs now default to base32 encoding

Previous versions returned a base58 encoded string when `toString()`/
`toBaseEncodedString()` was called on a CIDv1. It now returns a base32
encoded string.



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ipld/js-ipld-raw/compare/v2.0.1...v3.0.0) (2019-05-08)


### Bug Fixes

* install step ([25daf7a](https://github.com/ipld/js-ipld-raw/commit/25daf7a))
* **package:** update cids to version 0.6.0 ([5f70e4e](https://github.com/ipld/js-ipld-raw/commit/5f70e4e))
* **package:** update multihashing-async to version 0.6.0 ([b2bb041](https://github.com/ipld/js-ipld-raw/commit/b2bb041))


### Features

* new IPLD Format API ([88dfb29](https://github.com/ipld/js-ipld-raw/commit/88dfb29))


### BREAKING CHANGES

* The API is now async/await based

There are numerous changes, the most significant one is that the API
is no longer callback based, but it using async/await.

For the full new API please see the [IPLD Formats spec].

[IPLD Formats spec]: https://github.com/ipld/interface-ipld-format



<a name="2.0.1"></a>
## [2.0.1](https://github.com/ipld/js-ipld-raw/compare/v2.0.0...v2.0.1) (2018-06-29)


### Bug Fixes

* resolver.tree allow options to be ommitted ([2903bf7](https://github.com/ipld/js-ipld-raw/commit/2903bf7)), closes [#4](https://github.com/ipld/js-ipld-raw/issues/4)


### Features

* add defaultHashAlg ([b7db79b](https://github.com/ipld/js-ipld-raw/commit/b7db79b))
* add util.cid options ([#13](https://github.com/ipld/js-ipld-raw/issues/13)) ([bb2fbf7](https://github.com/ipld/js-ipld-raw/commit/bb2fbf7)), closes [ipld/interface-ipld-format#40](https://github.com/ipld/interface-ipld-format/issues/40)



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ipld/js-ipld-raw/compare/v1.0.7...v2.0.0) (2018-02-12)


### Bug Fixes

* use binary blobs directly ([6fc00cd](https://github.com/ipld/js-ipld-raw/commit/6fc00cd))


### BREAKING CHANGES

* Everyone calling the functions of `resolve` need to
pass in the binary data instead of an IPFS block.

So if your input is an IPFS block, the code changes from

    resolver.resolve(block, path, (err, result) => {…}

to

    resolver.resolve(block.data, path, (err, result) => {…}



<a name="1.0.7"></a>
## [1.0.7](https://github.com/ipld/js-ipld-raw/compare/v1.0.5...v1.0.7) (2017-11-07)



<a name="1.0.5"></a>
## [1.0.5](https://github.com/ipld/js-ipld-raw/compare/v1.0.4...v1.0.5) (2017-10-06)



<a name="1.0.4"></a>
## [1.0.4](https://github.com/ipld/js-ipld-raw/compare/v1.0.3...v1.0.4) (2017-10-06)



<a name="1.0.3"></a>
## [1.0.3](https://github.com/ipld/js-ipld-raw/compare/v1.0.2...v1.0.3) (2017-10-06)



<a name="1.0.2"></a>
## 1.0.2 (2017-10-06)



