## [8.1.2](https://github.com/ipfs/js-ipfs-utils/compare/v8.1.1...v8.1.2) (2021-06-01)



## [8.1.1](https://github.com/ipfs/js-ipfs-utils/compare/v8.1.0...v8.1.1) (2021-05-28)


### Bug Fixes

* use node-fetch fork with fix for stream closed prematurely bug ([#127](https://github.com/ipfs/js-ipfs-utils/issues/127)) ([4ad105a](https://github.com/ipfs/js-ipfs-utils/commit/4ad105a14300fe59d3b93c4522a1a67efb3c288f))



# [8.1.0](https://github.com/ipfs/js-ipfs-utils/compare/v8.0.0...v8.1.0) (2021-05-21)


### Features

* add React Native android support ([#91](https://github.com/ipfs/js-ipfs-utils/issues/91)) ([b2b02a5](https://github.com/ipfs/js-ipfs-utils/commit/b2b02a5722f516b24813a54b3184c888935d31da))



# [8.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v7.0.0...v8.0.0) (2021-05-10)


### chore

* remove text encoder ([#116](https://github.com/ipfs/js-ipfs-utils/issues/116)) ([686c745](https://github.com/ipfs/js-ipfs-utils/commit/686c745d2c9c00134d72da309825502edb3ea977))


### BREAKING CHANGES

* text encoder/decoder files have been removed



# [7.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.8...v7.0.0) (2021-05-04)


### Bug Fixes

* remove retyping of modules with types ([#125](https://github.com/ipfs/js-ipfs-utils/issues/125)) ([f6406c5](https://github.com/ipfs/js-ipfs-utils/commit/f6406c5af4abb83fa11113202f785e8a7c9f6941)), closes [#109](https://github.com/ipfs/js-ipfs-utils/issues/109)


### BREAKING CHANGES

* `ResponseWithURL` type is not exported any more as it uses a private name and causes an inconsistency between node and the browser



## [6.0.8](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.7...v6.0.8) (2021-04-30)


### Bug Fixes

* exclude glob-source.js in browser build ([#121](https://github.com/ipfs/js-ipfs-utils/issues/121)) ([c4071d9](https://github.com/ipfs/js-ipfs-utils/commit/c4071d902d65c7c76e934f43e1f80a209113eac5))



## [6.0.7](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.6...v6.0.7) (2021-04-14)



## [6.0.6](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.5...v6.0.6) (2021-04-06)



## [6.0.5](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.4...v6.0.5) (2021-04-01)


### Bug Fixes

* do not use electron-fetch types ([#113](https://github.com/ipfs/js-ipfs-utils/issues/113)) ([658a725](https://github.com/ipfs/js-ipfs-utils/commit/658a725148715b3c6e3653e01d8ed6dab53d8401))



## [6.0.4](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.3...v6.0.4) (2021-03-22)


### Bug Fixes

* allow all supported unixfs time types ([#111](https://github.com/ipfs/js-ipfs-utils/issues/111)) ([72e0097](https://github.com/ipfs/js-ipfs-utils/commit/72e0097accb58eb01480bb47085edfe25ea7bf9a))



## [6.0.3](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.2...v6.0.3) (2021-03-15)



## [6.0.2](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.1...v6.0.2) (2021-03-15)



## [6.0.1](https://github.com/ipfs/js-ipfs-utils/compare/v6.0.0...v6.0.1) (2021-02-07)



# [6.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v5.0.1...v6.0.0) (2021-01-15)


### Features

* add types, gh actions and remove unused methods ([#89](https://github.com/ipfs/js-ipfs-utils/issues/89)) ([707174c](https://github.com/ipfs/js-ipfs-utils/commit/707174c131a0651677200329583bf7dca652504a))
* make urlSource compatible with new ipfs.add ([#53](https://github.com/ipfs/js-ipfs-utils/issues/53)) ([2b3ebbe](https://github.com/ipfs/js-ipfs-utils/commit/2b3ebbe86df409c1bc89d7855bf427446748b073)), closes [ipfs/js-ipfs#3195](https://github.com/ipfs/js-ipfs/issues/3195)


### BREAKING CHANGES

* removed globalThis and normalise-input, format-mode and format-mtime



## [5.0.1](https://github.com/ipfs/js-ipfs-utils/compare/v5.0.0...v5.0.1) (2020-11-25)



# [5.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v4.0.1...v5.0.0) (2020-11-16)


### Features

* add onUploadProgress handler ([#60](https://github.com/ipfs/js-ipfs-utils/issues/60)) ([a2e88e2](https://github.com/ipfs/js-ipfs-utils/commit/a2e88e23f16bd0da57a67c02e8c875a2705bb28f))



## [4.0.1](https://github.com/ipfs/js-ipfs-utils/compare/v4.0.0...v4.0.1) (2020-11-09)


### Bug Fixes

* fetch takes a string, not a URL ([#75](https://github.com/ipfs/js-ipfs-utils/issues/75)) ([15576b2](https://github.com/ipfs/js-ipfs-utils/commit/15576b28495caee7410fda51d8cb5aa2c8e6d106)), closes [#74](https://github.com/ipfs/js-ipfs-utils/issues/74)



<a name="4.0.0"></a>
# [4.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v3.0.0...v4.0.0) (2020-10-10)


### Bug Fixes

* use native fetch if available ([#62](https://github.com/ipfs/js-ipfs-utils/issues/62)) ([9b0ff2f](https://github.com/ipfs/js-ipfs-utils/commit/9b0ff2f))



<a name="3.0.0"></a>
# [3.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v2.4.0...v3.0.0) (2020-08-18)


### Bug Fixes

* revert "feat: http upload/download progress handlers" ([#58](https://github.com/ipfs/js-ipfs-utils/issues/58)) ([1bbe957](https://github.com/ipfs/js-ipfs-utils/commit/1bbe957))



<a name="2.4.0"></a>
# [2.4.0](https://github.com/ipfs/js-ipfs-utils/compare/v2.3.1...v2.4.0) (2020-08-12)


### Features

* detect support for WebRTC data channels ([#56](https://github.com/ipfs/js-ipfs-utils/issues/56)) ([78ad2d2](https://github.com/ipfs/js-ipfs-utils/commit/78ad2d2)), closes [#50](https://github.com/ipfs/js-ipfs-utils/issues/50)
* http upload/download progress handlers ([#54](https://github.com/ipfs/js-ipfs-utils/issues/54)) ([d30be96](https://github.com/ipfs/js-ipfs-utils/commit/d30be96)), closes [#52](https://github.com/ipfs/js-ipfs-utils/issues/52) [#52](https://github.com/ipfs/js-ipfs-utils/issues/52)



<a name="2.3.1"></a>
## [2.3.1](https://github.com/ipfs/js-ipfs-utils/compare/v2.3.0...v2.3.1) (2020-06-18)


### Features

* add webrtc to supports ([#38](https://github.com/ipfs/js-ipfs-utils/issues/38)) ([8cca85d](https://github.com/ipfs/js-ipfs-utils/commit/8cca85d))



<a name="2.3.0"></a>
# [2.3.0](https://github.com/ipfs/js-ipfs-utils/compare/v2.2.2...v2.3.0) (2020-06-10)


### Bug Fixes

* text encoder / decoder exports ([c4792e1](https://github.com/ipfs/js-ipfs-utils/commit/c4792e1))



<a name="2.2.2"></a>
## [2.2.2](https://github.com/ipfs/js-ipfs-utils/compare/v2.2.1...v2.2.2) (2020-05-05)


### Bug Fixes

* fix headers and abort signals ([#41](https://github.com/ipfs/js-ipfs-utils/issues/41)) ([ad977a9](https://github.com/ipfs/js-ipfs-utils/commit/ad977a9))
* **ci:** add empty commit to fix lint checks on master ([ad2fdc4](https://github.com/ipfs/js-ipfs-utils/commit/ad2fdc4))



<a name="2.2.1"></a>
## [2.2.1](https://github.com/ipfs/js-ipfs-utils/compare/v2.2.0...v2.2.1) (2020-05-01)


### Bug Fixes

* make timeouts stricter ([#40](https://github.com/ipfs/js-ipfs-utils/issues/40)) ([bbcd1eb](https://github.com/ipfs/js-ipfs-utils/commit/bbcd1eb))


### Features

* pass in Options Object to http Constructor ([#37](https://github.com/ipfs/js-ipfs-utils/issues/37)) ([727f28d](https://github.com/ipfs/js-ipfs-utils/commit/727f28d))



<a name="2.2.0"></a>
# [2.2.0](https://github.com/ipfs/js-ipfs-utils/compare/v2.1.0...v2.2.0) (2020-04-14)


### Features

* add json option to http ([#34](https://github.com/ipfs/js-ipfs-utils/issues/34)) ([070a456](https://github.com/ipfs/js-ipfs-utils/commit/070a456))



<a name="2.1.0"></a>
# [2.1.0](https://github.com/ipfs/js-ipfs-utils/compare/v2.0.0...v2.1.0) (2020-04-13)


### Features

* add iterator method to response ([#36](https://github.com/ipfs/js-ipfs-utils/issues/36)) ([8f7c96c](https://github.com/ipfs/js-ipfs-utils/commit/8f7c96c))



<a name="2.0.0"></a>
# [2.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v1.2.4...v2.0.0) (2020-04-09)


### Bug Fixes

* simplify http client ([#35](https://github.com/ipfs/js-ipfs-utils/issues/35)) ([05c4c5d](https://github.com/ipfs/js-ipfs-utils/commit/05c4c5d))


### BREAKING CHANGES

* - The `.ndjson`, `.stream` and `.iterator` methods have been removed
- An `.ndjson` async generator function has been added to the response which
  does the same thing the `.ndjson` instance method used to

Old:

```javascript
for await (const datum of http.ndjson('http://...')) {

}
```

New:

```javascript
const response = await http.post('http://...')

for await (const datum of response.ndjson()) {

}
```



<a name="1.2.4"></a>
## [1.2.4](https://github.com/ipfs/js-ipfs-utils/compare/v1.2.3...v1.2.4) (2020-04-08)


### Bug Fixes

* detect node stream with hasOwnProperty ([#33](https://github.com/ipfs/js-ipfs-utils/issues/33)) ([1c1d894](https://github.com/ipfs/js-ipfs-utils/commit/1c1d894))



<a name="1.2.3"></a>
## [1.2.3](https://github.com/ipfs/js-ipfs-utils/compare/v1.2.2...v1.2.3) (2020-04-07)


### Bug Fixes

* destroy request body when we are aborting it midway though r… ([#31](https://github.com/ipfs/js-ipfs-utils/issues/31)) ([1f7506d](https://github.com/ipfs/js-ipfs-utils/commit/1f7506d))



<a name="1.2.2"></a>
## [1.2.2](https://github.com/ipfs/js-ipfs-utils/compare/v1.2.1...v1.2.2) (2020-04-06)


### Bug Fixes

* avoid Identifier 'global' has already been declared ([#30](https://github.com/ipfs/js-ipfs-utils/issues/30)) ([f468065](https://github.com/ipfs/js-ipfs-utils/commit/f468065))



<a name="1.2.1"></a>
## [1.2.1](https://github.com/ipfs/js-ipfs-utils/compare/v1.2.0...v1.2.1) (2020-03-31)


### Bug Fixes

* fix path join swap ([b538ee4](https://github.com/ipfs/js-ipfs-utils/commit/b538ee4))



<a name="1.2.0"></a>
# [1.2.0](https://github.com/ipfs/js-ipfs-utils/compare/v1.1.0...v1.2.0) (2020-03-31)


### Features

* add path join ([a535e42](https://github.com/ipfs/js-ipfs-utils/commit/a535e42))



<a name="1.1.0"></a>
# [1.1.0](https://github.com/ipfs/js-ipfs-utils/compare/v1.0.0...v1.1.0) (2020-03-26)


### Bug Fixes

* fix error code param ([dd73a33](https://github.com/ipfs/js-ipfs-utils/commit/dd73a33))


### Features

* add temp dir function ([7714c66](https://github.com/ipfs/js-ipfs-utils/commit/7714c66))



<a name="1.0.0"></a>
# [1.0.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.7.2...v1.0.0) (2020-03-20)


### Features

* import code from monorepo ([#25](https://github.com/ipfs/js-ipfs-utils/issues/25)) ([dcd6f77](https://github.com/ipfs/js-ipfs-utils/commit/dcd6f77))



<a name="0.7.2"></a>
## [0.7.2](https://github.com/ipfs/js-ipfs-utils/compare/v0.7.1...v0.7.2) (2020-02-10)


### Bug Fixes

* number is not a valid mtime value ([#24](https://github.com/ipfs/js-ipfs-utils/issues/24)) ([bb2d841](https://github.com/ipfs/js-ipfs-utils/commit/bb2d841)), closes [/github.com/ipfs/js-ipfs-unixfs/blob/master/src/index.js#L104-L106](https://github.com//github.com/ipfs/js-ipfs-unixfs/blob/master/src/index.js/issues/L104-L106)



<a name="0.7.1"></a>
## [0.7.1](https://github.com/ipfs/js-ipfs-utils/compare/v0.7.0...v0.7.1) (2020-01-23)


### Bug Fixes

* downgrade to ky 15 ([#22](https://github.com/ipfs/js-ipfs-utils/issues/22)) ([5dd7570](https://github.com/ipfs/js-ipfs-utils/commit/5dd7570))



<a name="0.7.0"></a>
# [0.7.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.6.0...v0.7.0) (2020-01-23)


### Features

* accept browser readable streams as input ([#21](https://github.com/ipfs/js-ipfs-utils/issues/21)) ([0902067](https://github.com/ipfs/js-ipfs-utils/commit/0902067))



<a name="0.6.0"></a>
# [0.6.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.5.0...v0.6.0) (2020-01-09)


### Bug Fixes

* dependency badge URL ([#16](https://github.com/ipfs/js-ipfs-utils/issues/16)) ([5d93881](https://github.com/ipfs/js-ipfs-utils/commit/5d93881))
* format mtime as timespec ([#20](https://github.com/ipfs/js-ipfs-utils/issues/20)) ([a68f8b1](https://github.com/ipfs/js-ipfs-utils/commit/a68f8b1))



<a name="0.5.0"></a>
# [0.5.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.4.0...v0.5.0) (2019-12-06)


### Features

* convert to async iterators ([#15](https://github.com/ipfs/js-ipfs-utils/issues/15)) ([251eff0](https://github.com/ipfs/js-ipfs-utils/commit/251eff0))
* support unixfs metadata and formatting it ([#14](https://github.com/ipfs/js-ipfs-utils/issues/14)) ([173e4bf](https://github.com/ipfs/js-ipfs-utils/commit/173e4bf))


### BREAKING CHANGES

* In order to support metadata on intermediate directories, globSource in this module will now emit directories and files where previously it only emitted files.
* Support for Node.js streams and Pull Streams has been removed



<a name="0.4.0"></a>
# [0.4.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.3.0...v0.4.0) (2019-09-19)


### Features

* add isElectronMain env test ([#13](https://github.com/ipfs/js-ipfs-utils/issues/13)) ([9072c90](https://github.com/ipfs/js-ipfs-utils/commit/9072c90))



<a name="0.3.0"></a>
# [0.3.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.2.0...v0.3.0) (2019-09-15)


### Features

* support old school streams ([#12](https://github.com/ipfs/js-ipfs-utils/issues/12)) ([18cfa86](https://github.com/ipfs/js-ipfs-utils/commit/18cfa86))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.1.0...v0.2.0) (2019-09-06)


### Features

* env/isTest ([#10](https://github.com/ipfs/js-ipfs-utils/issues/10)) ([481aab1](https://github.com/ipfs/js-ipfs-utils/commit/481aab1))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/ipfs/js-ipfs-utils/compare/v0.0.4...v0.1.0) (2019-09-04)


### Bug Fixes

* write after end ([#7](https://github.com/ipfs/js-ipfs-utils/issues/7)) ([b30d7a3](https://github.com/ipfs/js-ipfs-utils/commit/b30d7a3))


### Features

* add glob-source from js-ipfs to be shared ([#9](https://github.com/ipfs/js-ipfs-utils/issues/9)) ([0a95ef8](https://github.com/ipfs/js-ipfs-utils/commit/0a95ef8))
* add normalise input function ([#5](https://github.com/ipfs/js-ipfs-utils/issues/5)) ([b22b8de](https://github.com/ipfs/js-ipfs-utils/commit/b22b8de)), closes [#8](https://github.com/ipfs/js-ipfs-utils/issues/8)



<a name="0.0.4"></a>
## [0.0.4](https://github.com/ipfs/js-ipfs-utils/compare/v0.0.3...v0.0.4) (2019-07-18)


### Features

* add globalThis polyfill ([f0c7c42](https://github.com/ipfs/js-ipfs-utils/commit/f0c7c42))



<a name="0.0.3"></a>
## [0.0.3](https://github.com/ipfs/js-ipfs-utils/compare/v0.0.2...v0.0.3) (2019-05-16)



<a name="0.0.2"></a>
## 0.0.2 (2019-05-16)


### Bug Fixes

* use is-buffer ([bbf5baf](https://github.com/ipfs/js-ipfs-utils/commit/bbf5baf))



