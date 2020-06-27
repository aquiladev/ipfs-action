'use strict'

var tape = require('tape')
var protobuf = require('../')
const TextEncoder = require('ipfs-utils/src/text-encoder')

var Nested = protobuf(require('./test.proto')).Nested

tape('nested encode', function (t) {
  var b1 = Nested.encode({
    num: 1,
    payload: new TextEncoder().encode('lol'),
    meh: {
      num: 2,
      payload: new TextEncoder().encode('bar')
    }
  })

  var b2 = Nested.encode({
    num: 1,
    payload: new TextEncoder().encode('lol'),
    meeeh: 42,
    meh: {
      num: 2,
      payload: new TextEncoder().encode('bar')
    }
  })

  t.same(b2, b1)
  t.end()
})

tape('nested encode + decode', function (t) {
  var b1 = Nested.encode({
    num: 1,
    payload: new TextEncoder().encode('lol'),
    meh: {
      num: 2,
      payload: new TextEncoder().encode('bar')
    }
  })

  var o1 = Nested.decode(b1)

  t.same(o1.num, 1)
  t.same(o1.payload, Buffer.from('lol'))
  t.ok(o1.meh, 'has nested property')
  t.same(o1.meh.num, 2)
  t.same(o1.meh.payload, Buffer.from('bar'))

  var b2 = Nested.encode({
    num: 1,
    payload: new TextEncoder().encode('lol'),
    meeeh: 42,
    meh: {
      num: 2,
      payload: new TextEncoder().encode('bar')
    }
  })

  var o2 = Nested.decode(b2)

  t.same(o2, o1)
  t.end()
})
