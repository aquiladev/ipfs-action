
# recursive-fs

[![npm-version]][npm] [![travis-ci]][travis] [![coveralls-status]][coveralls]


## readdirr

```js
var recursive = require('recursive-fs')

var path = require('path')
var directory = path.resolve(process.cwd(), process.argv[2])

recursive.readdirr(directory, function (err, dirs, files) {
  if (err) {
    console.log(err)
  } else {
    console.log(dirs)
    console.log(files)
    console.log('DONE!')
  }
})
```


## rmdirr

```js
var recursive = require('recursive-fs')

var path = require('path')
var directory = path.resolve(process.cwd(), process.argv[2])

recursive.rmdirr(directory, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


## cpdirr

```js
var recursive = require('recursive-fs')

var path = require('path')
var source = path.resolve(process.cwd(), process.argv[2])
var destination = path.resolve(process.cwd(), process.argv[3])

recursive.cpdirr(source, destination, function (err) {
  if (err) {
    console.log(err)
  } else {
    console.log('DONE!')
  }
})
```


## recursive-copy

```bash
npx recursive-copy 'path/to/source/directory' 'path/to/destination/directory'
```


## recursive-delete

```bash
npx recursive-delete 'path/to/directory'
```


  [npm-version]: https://img.shields.io/npm/v/recursive-fs.svg?style=flat-square (NPM Package Version)
  [travis-ci]: https://img.shields.io/travis/simov/recursive-fs/master.svg?style=flat-square (Build Status - Travis CI)
  [coveralls-status]: https://img.shields.io/coveralls/simov/recursive-fs.svg?style=flat-square (Test Coverage - Coveralls)

  [npm]: https://www.npmjs.com/package/recursive-fs
  [travis]: https://travis-ci.org/simov/recursive-fs
  [coveralls]: https://coveralls.io/github/simov/recursive-fs
