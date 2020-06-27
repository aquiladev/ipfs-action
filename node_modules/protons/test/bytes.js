'use strict'

var tape = require('tape')
var protobuf = require('../src')
var Bytes = protobuf(require('./test.proto')).Bytes

tape('bytes encode + decode', function (t) {
  var b1 = Bytes.encode({
    req: Uint8Array.from([0, 1, 2, 3])
  })

  var o1 = Bytes.decode(b1)

  t.same(o1, {
    req: Buffer.from([0, 1, 2, 3]),
    opt: null
  })
  t.notOk(o1.hasOpt())

  t.end()
})
