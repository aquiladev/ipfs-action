# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [4.0.3](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@4.0.2...ipfs-unixfs@4.0.3) (2021-04-20)


### Bug Fixes

* add pbjs namespace ([#145](https://github.com/ipfs/js-ipfs-unixfs/issues/145)) ([dd26b92](https://github.com/ipfs/js-ipfs-unixfs/commit/dd26b92606a935d08221a0bf6709a4954d864259))





## [4.0.2](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@4.0.1...ipfs-unixfs@4.0.2) (2021-04-16)

**Note:** Version bump only for package ipfs-unixfs





## [4.0.1](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@4.0.0...ipfs-unixfs@4.0.1) (2021-03-19)

**Note:** Version bump only for package ipfs-unixfs





# [4.0.0](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@3.0.1...ipfs-unixfs@4.0.0) (2021-03-15)


### chore

* declare interface types in .d.ts file ([#122](https://github.com/ipfs/js-ipfs-unixfs/issues/122)) ([eaa8449](https://github.com/ipfs/js-ipfs-unixfs/commit/eaa8449c10abed9d9a378bee544b4ff501666c4b))


### BREAKING CHANGES

* switches to named exports





## [3.0.1](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@3.0.0...ipfs-unixfs@3.0.1) (2021-02-23)

**Note:** Version bump only for package ipfs-unixfs





# [3.0.0](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@2.0.4...ipfs-unixfs@3.0.0) (2021-02-18)


### Features

* add types ([#114](https://github.com/ipfs/js-ipfs-unixfs/issues/114)) ([ca26353](https://github.com/ipfs/js-ipfs-unixfs/commit/ca26353081ae192718532d3dbd60779863fe6d53))


### BREAKING CHANGES

* types are now included with all unixfs modules





## [2.0.4](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@2.0.3...ipfs-unixfs@2.0.4) (2020-11-04)

**Note:** Version bump only for package ipfs-unixfs





## [2.0.3](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@2.0.2...ipfs-unixfs@2.0.3) (2020-08-25)

**Note:** Version bump only for package ipfs-unixfs





## [2.0.2](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@2.0.1...ipfs-unixfs@2.0.2) (2020-08-05)


### Bug Fixes

* replace node buffers with uint8arrays ([#69](https://github.com/ipfs/js-ipfs-unixfs/issues/69)) ([8a5aed2](https://github.com/ipfs/js-ipfs-unixfs/commit/8a5aed2ca76de16778ff37822c058531d4fcdcb5)), closes [#66](https://github.com/ipfs/js-ipfs-unixfs/issues/66)





## [2.0.1](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@2.0.0...ipfs-unixfs@2.0.1) (2020-07-28)

**Note:** Version bump only for package ipfs-unixfs





# [2.0.0](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@1.0.2...ipfs-unixfs@2.0.0) (2020-07-28)


### Bug Fixes

* ignore high mode bits passed to constructor ([#53](https://github.com/ipfs/js-ipfs-unixfs/issues/53)) ([8e8d83d](https://github.com/ipfs/js-ipfs-unixfs/commit/8e8d83d757276be7e1cb2581abd4b562cb8209e2))


### chore

* remove node buffers from runtime code ([#66](https://github.com/ipfs/js-ipfs-unixfs/issues/66)) ([db60a42](https://github.com/ipfs/js-ipfs-unixfs/commit/db60a4232e600e73227e6ab8964be083eada389a))


### BREAKING CHANGES

* does not convert input to node Buffers any more, uses Uint8Arrays instead





## [1.0.2](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@1.0.1...ipfs-unixfs@1.0.2) (2020-04-24)


### Bug Fixes

* remove node globals ([#52](https://github.com/ipfs/js-ipfs-unixfs/issues/52)) ([5414412](https://github.com/ipfs/js-ipfs-unixfs/commit/5414412b6b228d7922a10210825c9b85b0362af6))





## [1.0.1](https://github.com/ipfs/js-ipfs-unixfs/compare/ipfs-unixfs@1.0.0...ipfs-unixfs@1.0.1) (2020-03-30)

**Note:** Version bump only for package ipfs-unixfs





# 1.0.0 (2020-02-21)

**Note:** Version bump only for package ipfs-unixfs





# [0.3.0](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.2.0...v0.3.0) (2020-01-08)


### Bug Fixes

* address PR comments, refactor to modern class ([45b0b30](https://github.com/ipfs/js-ipfs-unixfs/commit/45b0b30427ed7471a9df681c72528a54243534b5))
* allow mtime and mode to be optional ([00e5ea0](https://github.com/ipfs/js-ipfs-unixfs/commit/00e5ea0567b4a3441b0b908b252de3eeac099805))
* mask file mode ([#39](https://github.com/ipfs/js-ipfs-unixfs/issues/39)) ([09fd4ed](https://github.com/ipfs/js-ipfs-unixfs/commit/09fd4edfd01c1744052f8db1c36f9641e865507b))
* remove boolean trap constructor and update readme ([9517501](https://github.com/ipfs/js-ipfs-unixfs/commit/9517501c325887fa80db8deca6ee8cb967473314))
* unsaved file buffer ([04ea7a1](https://github.com/ipfs/js-ipfs-unixfs/commit/04ea7a1fc61b0b6ce5035d65253675e2b4908b33))
* update protons to latest version ([e232acf](https://github.com/ipfs/js-ipfs-unixfs/commit/e232acf8f1f2c45c6eae791468c56c844f185d82))
* use correct field index ([397931e](https://github.com/ipfs/js-ipfs-unixfs/commit/397931ee0bd0e28055c51f006234788b2e2b6d57))
* values are required, containing types are not ([3a86a0b](https://github.com/ipfs/js-ipfs-unixfs/commit/3a86a0b5b2801b7429c88b986c96f92c89baf694))


### Features

* return mtime as Date object ([a6c4208](https://github.com/ipfs/js-ipfs-unixfs/commit/a6c4208566632b6e718b0bd3b9a9999cab0e3dc2))
* store time as timespec ([#40](https://github.com/ipfs/js-ipfs-unixfs/issues/40)) ([8adc245](https://github.com/ipfs/js-ipfs-unixfs/commit/8adc2458747e81cb15703c83cd29fa82c635ec8c))



<a name="0.2.0"></a>
# [0.2.0](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.16...v0.2.0) (2019-11-18)


### Features

* adds metadata to unixfs ([540f20a](https://github.com/ipfs/js-ipfs-unixfs/commit/540f20a))



<a name="0.1.16"></a>
## [0.1.16](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.15...v0.1.16) (2018-10-26)



<a name="0.1.15"></a>
## [0.1.15](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.14...v0.1.15) (2018-06-08)


### Bug Fixes

* a typo ([932b804](https://github.com/ipfs/js-ipfs-unixfs/commit/932b804))



<a name="0.1.14"></a>
## [0.1.14](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.13...v0.1.14) (2017-11-07)



<a name="0.1.13"></a>
## [0.1.13](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.12...v0.1.13) (2017-09-07)


### Features

* migrate out of protocol-buffers and into protons ([32deddc](https://github.com/ipfs/js-ipfs-unixfs/commit/32deddc))



<a name="0.1.12"></a>
## [0.1.12](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.11...v0.1.12) (2017-06-16)


### Bug Fixes

* dirs shouldn't have file size ([#16](https://github.com/ipfs/js-ipfs-unixfs/issues/16)) ([6df8579](https://github.com/ipfs/js-ipfs-unixfs/commit/6df8579))



<a name="0.1.11"></a>
## [0.1.11](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.10...v0.1.11) (2017-03-09)



<a name="0.1.10"></a>
## [0.1.10](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.9...v0.1.10) (2017-02-09)



<a name="0.1.9"></a>
## [0.1.9](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.8...v0.1.9) (2016-12-13)



<a name="0.1.8"></a>
## [0.1.8](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.7...v0.1.8) (2016-11-26)


### Bug Fixes

* regression of regression ([91931f4](https://github.com/ipfs/js-ipfs-unixfs/commit/91931f4))



<a name="0.1.7"></a>
## [0.1.7](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.6...v0.1.7) (2016-11-26)



<a name="0.1.6"></a>
## [0.1.6](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.5...v0.1.6) (2016-11-26)


### Bug Fixes

* update breaking dep (protocol-buffers) ([42a16f8](https://github.com/ipfs/js-ipfs-unixfs/commit/42a16f8))



<a name="0.1.5"></a>
## [0.1.5](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.1...v0.1.5) (2016-11-03)



<a name="0.1.1"></a>
## [0.1.1](https://github.com/ipfs/js-ipfs-unixfs/compare/v0.1.0...v0.1.1) (2016-02-24)



<a name="0.1.0"></a>
# 0.1.0 (2016-02-10)
