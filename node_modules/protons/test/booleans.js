'use strict'

var tape = require('tape')
var fs = require('fs')
var path = require('path')
var protobuf = require('../src')
var Booleans = protobuf(fs.readFileSync(path.join(__dirname, '/test.proto'))).Booleans

tape('booleans encode + decode', function (t) {
  var b1 = Booleans.encode({
    bool1: true,
    bool2: false
  })

  var o1 = Booleans.decode(b1)

  t.same(o1, {
    bool1: true,
    bool2: false
  })

  t.end()
})

tape('booleans encode + decode + optional', function (t) {
  var b1 = Booleans.encode({
    bool1: true
  })

  var o1 = Booleans.decode(b1)

  t.same(o1, {
    bool1: true,
    bool2: false
  })
  t.notOk(o1.hasBool2())

  t.end()
})
