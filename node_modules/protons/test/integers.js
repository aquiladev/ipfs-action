'use strict'

var tape = require('tape')
var protobuf = require('../')
var Integers = protobuf(require('./test.proto')).Integers

tape('integers encode + decode', function (t) {
  var b1 = Integers.encode({
    sint32: 1,
    sint64: 2,
    int32: 3,
    uint32: 4,
    int64: 5
  })

  var o1 = Integers.decode(b1)

  t.same(o1, {
    sint32: 1,
    sint64: 2,
    int32: 3,
    uint32: 4,
    int64: 5
  })

  t.end()
})

tape('integers encode + decode + negative', function (t) {
  var b1 = Integers.encode({
    sint32: -1,
    sint64: -2,
    int32: -3,
    uint32: 0,
    int64: -1 * Math.pow(2, 52) - 5
  })

  var o1 = Integers.decode(b1)

  t.same(o1, {
    sint32: -1,
    sint64: -2,
    int32: -3,
    uint32: 0,
    int64: -1 * Math.pow(2, 52) - 5
  })

  t.end()
})

tape('integers encode + decode + optional', function (t) {
  var b1 = Integers.encode({
    sint32: null
  })
  var b2 = Integers.encode({
    sint32: 0
  })

  // sint32 is optional, verify that setting it to null does not
  // cause a value to be written into the encoded buffer
  t.ok(b1.length < b2.length)

  var o1 = Integers.decode(b1)
  t.notOk(o1.hasSint32())

  var o2 = Integers.decode(b2)
  t.equal(o2.sint32, 0)

  t.end()
})
