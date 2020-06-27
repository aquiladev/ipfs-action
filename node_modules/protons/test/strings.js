'use strict'

var tape = require('tape')
var protobuf = require('../src')
var Strings = protobuf(require('./test.proto')).Strings

tape('strings encode + decode', function (t) {
  var b1 = Strings.encode({
    name: 'hello',
    desc: 'world'
  })

  var o1 = Strings.decode(b1)

  t.same(o1, {
    name: 'hello',
    desc: 'world'
  })

  t.end()
})

tape('strings encode + decode + omitted', function (t) {
  var b1 = Strings.encode({
    name: 'hello'
  })

  var o1 = Strings.decode(b1)

  t.same(o1.name, 'hello')
  t.notOk(o1.hasDesc())

  t.end()
})

tape('strings empty', function (t) {
  var b1 = Strings.encode({
    name: ''
  })

  var o1 = Strings.decode(b1)

  t.same(o1.name, '')
  t.notOk(o1.hasDesc())

  t.end()
})
