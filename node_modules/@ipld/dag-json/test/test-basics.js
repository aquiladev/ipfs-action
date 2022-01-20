'use strict'
/* eslint-env mocha */
import { garbage } from 'ipld-garbage'
import chai from 'chai'
import { encode, decode } from '@ipld/dag-json'
import { bytes, CID } from 'multiformats'

const { assert } = chai
const same = assert.deepStrictEqual
const test = it

const recode = byts => encode(decode(byts))

const link = CID.parse('bafyreifepiu23okq5zuyvyhsoiazv2icw2van3s7ko6d3ixl5jx2yj2yhu')

describe('basic dag-json', () => {
  test('encode decode', () => {
    let byts = encode({ hello: 'world' })
    same(JSON.parse(bytes.toString(recode(byts))), { hello: 'world' })
    const o = { link, byts: bytes.fromString('asdf'), n: null, o: {} }
    byts = encode(o)
    same(decode(byts), o)
    same(bytes.isBinary(decode(byts).byts), true)
  })

  test('encode decode 2', () => {
    // mirrors a go-ipld-prime test, but with sorted keys
    const obj = { plain: 'olde string', bytes: new TextEncoder().encode('deadbeef') }
    const expected = '{"bytes":{"/":{"bytes":"ZGVhZGJlZWY"}},"plain":"olde string"}'
    const byts = encode(obj)
    same(JSON.parse(bytes.toString(recode(byts))), JSON.parse(expected))
    same(bytes.toString(recode(byts)), expected)
  })

  describe('reserved space', () => {
    test('allow alternative types', () => {
      //  wrong types
      for (const obj of [true, false, null, 1, -1, 1.1, { blip: 'bop' }, ['foo']]) {
        same(decode(encode({ '/': obj })), { '/': obj })
        same(decode(encode({ '/': { bytes: obj } })), { '/': { bytes: obj } })
      }
    })

    test('allow specials within reserved space', () => {
      // can we put slash-objects within slashes?
      same(decode(encode({ '/': bytes.fromString('asdf') })), { '/': bytes.fromString('asdf') })
      same(new TextDecoder().decode(encode({ '/': bytes.fromString('asdf') })), '{"/":{"/":{"bytes":"YXNkZg"}}}')
      same(decode(encode({ '/': link })), { '/': link })
      same(new TextDecoder().decode(encode({ '/': link })), '{"/":{"/":"bafyreifepiu23okq5zuyvyhsoiazv2icw2van3s7ko6d3ixl5jx2yj2yhu"}}')
    })

    test('disallow extraneous tokens', () => {
      // TODO: test encode() doesn't allow this
      assert.throws(() => decode(encode({ '/': link.toString(), x: 'bip' })))
      assert.throws(() => decode(encode({ '/': { bytes: 'mS7ldeA', x: 'bip' } })))
      assert.throws(() => decode(encode({ '/': { bytes: 'mS7ldeA' }, x: 'bip' })))
      assert.throws(() => decode(encode({ '/': { bytes: 'mS7ldeA', x: 'bip' }, bop: 'bip' })))
    })
  })

  test('native types', () => {
    const flip = obj => decode(encode(obj))
    same(flip('test'), 'test')
    same(flip(null), null)
    same(flip(12), 12)
    same(flip(-1), -1)
    same(flip(1.2), 1.2)
    same(flip(true), true)
    same(flip(false), false)
    same(flip([]), [])
    same(flip(['asdf']), ['asdf'])
    same(decode(new TextEncoder().encode('10.0')), 10)
    same(decode(new TextEncoder().encode('[-10.0, 1.0, 0.0, 100.0]')), [-10, 1, 0, 100])
  })

  test('stable map key sorting', () => {
    const s1 = bytes.toString(encode({ a: 1, b: 2, bb: 2.2, c: 3, c_: 3.3 }))
    const s2 = bytes.toString(encode({ c_: 3.3, bb: 2.2, b: 2, c: 3, a: 1 }))
    same('{"a":1,"b":2,"bb":2.2,"c":3,"c_":3.3}', s1)
    same('{"a":1,"b":2,"bb":2.2,"c":3,"c_":3.3}', s2)
  })

  test('bigints', () => {
    const verify = (inp) => {
      assert.strictEqual(decode(new TextEncoder().encode(String(inp))), inp)
    }

    // plain Number objects
    verify(0)
    verify(1)
    verify(-1)
    verify(Math.pow(2, 50))
    verify(-Math.pow(2, 50))
    verify(Number.MAX_SAFE_INTEGER)
    verify(-Number.MAX_SAFE_INTEGER)
    // should round-trip as BigInts
    verify(BigInt('9007199254740992')) // Number.MAX_SAFE_INTEGER+1
    verify(BigInt('9007199254740993'))
    verify(BigInt('11959030306112471731'))
    verify(BigInt('18446744073709551615')) // max uint64
    verify(BigInt('9223372036854775807')) // max int64
    verify(BigInt('-9007199254740992'))
    verify(BigInt('-9007199254740993'))
    verify(BigInt('-9223372036854776000')) // min int64
    verify(BigInt('-11959030306112471732'))
    verify(BigInt('-18446744073709551616')) // min -uint64
  })

  test('error on circular references', () => {
    const circularObj = {}
    circularObj.a = circularObj
    assert.throws(() => encode(circularObj), /object contains circular references/)
    const circularArr = [circularObj]
    circularObj.a = circularArr
    assert.throws(() => encode(circularArr), /object contains circular references/)
  })

  test('error on encoding undefined', () => {
    assert.throws(() => encode(undefined), /\Wundefined\W.*not supported/)
    const objWithUndefined = { a: 'a', b: undefined }
    assert.throws(() => encode(objWithUndefined), /\Wundefined\W.*not supported/)
  })

  test('error on encoding IEEE 754 specials', () => {
    for (const special of [NaN, Infinity, -Infinity]) {
      assert.throws(() => encode(special), new RegExp(`\\W${String(special)}\\W.*not supported`))
      const objWithSpecial = { a: 'a', b: special }
      assert.throws(() => encode(objWithSpecial), new RegExp(`\\W${String(special)}\\W.*not supported`))
      const arrWithSpecial = [1, 1.1, -1, -1.1, Number.MAX_SAFE_INTEGER, special, Number.MIN_SAFE_INTEGER]
      assert.throws(() => encode(arrWithSpecial), new RegExp(`\\W${String(special)}\\W.*not supported`))
    }
  })

  test('fuzz serialize and deserialize with garbage', function () {
    // filter out fuzz garbage for objects that are disqualified by DAG-JSON rules
    const checkObj = (obj) => {
      if (Array.isArray(obj)) {
        return obj.every(checkObj)
      }
      if (obj && typeof obj === 'object') {
        for (const [key, value] of Object.entries(obj)) {
          if (key === '/') {
            if (typeof value === 'string') {
              return false
            }
            if (value && typeof value === 'object' && value.bytes !== undefined) {
              return false
            }
          }
          if (!checkObj(value)) {
            return false
          }
        }
      }
      return true
    }

    this.timeout(5000)
    for (let ii = 0; ii < 1000; ii++) {
      const original = garbage(300)
      if (!checkObj(original)) {
        continue
      }
      try {
        const encoded = encode(original)
        const decoded = decode(encoded)
        same(decoded, original)
      } catch (err) {
        console.log('Failed on fuzz object:', original)
        throw err
      }
    }
  })
})
