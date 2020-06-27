'use strict'

var tape = require('tape')
var protobuf = require('../')
var proto = require('./test.proto')
var Optional = protobuf(proto).Optional

tape('optional encode + decode has zero value', function (t) {
  const o1 = {}
  const b1 = Optional.encode(o1)
  const o2 = Optional.decode(b1)

  t.same(o1.value, undefined)
  t.same(o2.value, 0)
  t.end()
})

tape('optional accessors', function (t) {
  const o1 = Optional.decode(Optional.encode({}))

  t.ok(o1.hasValue)
  t.notOk(o1.hasValue())

  t.ok(o1.setValue)
  o1.setValue(5)
  t.ok(o1.hasValue())

  t.ok(o1.getValue)
  t.same(o1.getValue(), 5)

  t.ok(o1.clearValue)
  o1.clearValue()

  t.notOk(o1.hasValue())
  t.same(o1.getValue(), undefined)

  const methods = Object.keys(o1)

  t.notOk(methods.includes('getValue'))
  t.notOk(methods.includes('setValue'))
  t.notOk(methods.includes('hasValue'))
  t.notOk(methods.includes('clearValue'))

  t.end()
})

tape('optional accessors with zero values', function (t) {
  const o1 = Optional.decode(Optional.encode({}))

  t.notOk(o1.hasValue())

  o1.setValue(0)
  t.ok(o1.hasValue())

  t.ok(o1.getValue)
  t.same(o1.getValue(), 0)

  const o2 = Optional.decode(Optional.encode(o1))

  t.ok(o2.hasValue())
  t.same(o2.getValue(), 0)

  t.end()
})
