'use strict'

var tape = require('tape')
var protobuf = require('../src')
var CustomType = protobuf(require('./test.proto')).CustomType

tape('custom types encode + decode', function (t) {
  var b1 = CustomType.encode({
    req: {
      num: 5,
      payload: Uint8Array.from([])
    }
  })

  var o1 = CustomType.decode(b1)

  t.same(o1, {
    req: {
      num: 5,
      payload: Buffer.from([])
    },
    opt: null
  })
  t.notOk(o1.hasOpt())

  t.end()
})
