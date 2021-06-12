/* eslint-env mocha */
'use strict'

const { randomBytes } = require('iso-random-stream')
const { expect } = require('aegir/utils/chai')
const all = require('it-all')
const drain = require('it-drain')
const uint8ArrayFromString = require('uint8arrays/from-string')

const { Key } = require('../src')

/**
 * @typedef {import('./types').Datastore} Datastore
 * @typedef {import('./types').Pair} Pair
 * @typedef {import('./types').QueryOrder} QueryOrder
 * @typedef {import('./types').QueryFilter} QueryFilter
 * @typedef {import('./types').KeyQueryOrder} KeyQueryOrder
 * @typedef {import('./types').KeyQueryFilter} KeyQueryFilter
 */

/**
 * @param {{ teardown: () => void; setup: () => Datastore; }} test
 */
module.exports = (test) => {
  /**
   * @param {Datastore} store
   */
  const cleanup = async store => {
    await store.close()
    await test.teardown()
  }

  const createStore = async () => {
    const store = await test.setup()
    if (!store) throw new Error('missing store')
    await store.open()
    return store
  }

  describe('put', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('simple', () => {
      const k = new Key('/z/one')
      return store.put(k, uint8ArrayFromString('one'))
    })

    it('parallel', async () => {
      const data = []
      for (let i = 0; i < 100; i++) {
        data.push({ key: new Key(`/z/key${i}`), value: uint8ArrayFromString(`data${i}`) })
      }

      await Promise.all(data.map(d => store.put(d.key, d.value)))

      const res = await all(store.getMany(data.map(d => d.key)))
      expect(res).to.deep.equal(data.map(d => d.value))
    })
  })

  describe('putMany', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('streaming', async () => {
      const data = []
      for (let i = 0; i < 100; i++) {
        data.push({ key: new Key(`/z/key${i}`), value: uint8ArrayFromString(`data${i}`) })
      }

      let index = 0

      for await (const { key, value } of store.putMany(data)) {
        expect(data[index]).to.deep.equal({ key, value })
        index++
      }

      expect(index).to.equal(data.length)

      const res = await all(store.getMany(data.map(d => d.key)))
      expect(res).to.deep.equal(data.map(d => d.value))
    })
  })

  describe('get', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('simple', async () => {
      const k = new Key('/z/one')
      await store.put(k, uint8ArrayFromString('hello'))
      const res = await store.get(k)
      expect(res).to.be.eql(uint8ArrayFromString('hello'))
    })

    it('should throw error for missing key', async () => {
      const k = new Key('/does/not/exist')

      try {
        await store.get(k)
      } catch (err) {
        expect(err).to.have.property('code', 'ERR_NOT_FOUND')
        return
      }

      throw new Error('expected error to be thrown')
    })
  })

  describe('getMany', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('streaming', async () => {
      const k = new Key('/z/one')
      await store.put(k, uint8ArrayFromString('hello'))
      const source = [k]

      const res = await all(store.getMany(source))
      expect(res).to.have.lengthOf(1)
      expect(res[0]).to.be.eql(uint8ArrayFromString('hello'))
    })

    it('should throw error for missing key', async () => {
      const k = new Key('/does/not/exist')

      try {
        await drain(store.getMany([k]))
      } catch (err) {
        expect(err).to.have.property('code', 'ERR_NOT_FOUND')
        return
      }

      throw new Error('expected error to be thrown')
    })
  })

  describe('delete', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('simple', async () => {
      const k = new Key('/z/one')
      await store.put(k, uint8ArrayFromString('hello'))
      await store.get(k)
      await store.delete(k)
      const exists = await store.has(k)
      expect(exists).to.be.eql(false)
    })

    it('parallel', async () => {
      /** @type {[Key, Uint8Array][]} */
      const data = []
      for (let i = 0; i < 100; i++) {
        data.push([new Key(`/a/key${i}`), uint8ArrayFromString(`data${i}`)])
      }

      await Promise.all(data.map(d => store.put(d[0], d[1])))

      const res0 = await Promise.all(data.map(d => store.has(d[0])))
      res0.forEach(res => expect(res).to.be.eql(true))

      await Promise.all(data.map(d => store.delete(d[0])))

      const res1 = await Promise.all(data.map(d => store.has(d[0])))
      res1.forEach(res => expect(res).to.be.eql(false))
    })
  })

  describe('deleteMany', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('streaming', async () => {
      const data = []
      for (let i = 0; i < 100; i++) {
        data.push({ key: new Key(`/a/key${i}`), value: uint8ArrayFromString(`data${i}`) })
      }

      await drain(store.putMany(data))

      const res0 = await Promise.all(data.map(d => store.has(d.key)))
      res0.forEach(res => expect(res).to.be.eql(true))

      let index = 0

      for await (const key of store.deleteMany(data.map(d => d.key))) {
        expect(data[index].key).to.deep.equal(key)
        index++
      }

      expect(index).to.equal(data.length)

      const res1 = await Promise.all(data.map(d => store.has(d.key)))
      res1.forEach(res => expect(res).to.be.eql(false))
    })
  })

  describe('batch', () => {
    /** @type {Datastore} */
    let store

    beforeEach(async () => {
      store = await createStore()
    })

    afterEach(() => cleanup(store))

    it('simple', async () => {
      const b = store.batch()

      await store.put(new Key('/z/old'), uint8ArrayFromString('old'))

      b.put(new Key('/a/one'), uint8ArrayFromString('1'))
      b.put(new Key('/q/two'), uint8ArrayFromString('2'))
      b.put(new Key('/q/three'), uint8ArrayFromString('3'))
      b.delete(new Key('/z/old'))
      await b.commit()

      const keys = ['/a/one', '/q/two', '/q/three', '/z/old']
      const res = await Promise.all(keys.map(k => store.has(new Key(k))))

      expect(res).to.be.eql([true, true, true, false])
    })

    it('many (3 * 400)', async function () {
      this.timeout(20 * 1000)
      const b = store.batch()
      const count = 400
      for (let i = 0; i < count; i++) {
        b.put(new Key(`/a/hello${i}`), randomBytes(32))
        b.put(new Key(`/q/hello${i}`), randomBytes(64))
        b.put(new Key(`/z/hello${i}`), randomBytes(128))
      }

      await b.commit()

      /**
       * @param {AsyncIterable<Pair>} iterable
       */
      const total = async iterable => {
        let count = 0
        // eslint-disable-next-line no-unused-vars
        for await (const _ of iterable) count++
        return count
      }

      expect(await total(store.query({ prefix: '/a' }))).to.equal(count)
      expect(await total(store.query({ prefix: '/z' }))).to.equal(count)
      expect(await total(store.query({ prefix: '/q' }))).to.equal(count)
    })
  })

  describe('query', () => {
    /** @type {Datastore} */
    let store
    const hello = { key: new Key('/q/1hello'), value: uint8ArrayFromString('1') }
    const world = { key: new Key('/z/2world'), value: uint8ArrayFromString('2') }
    const hello2 = { key: new Key('/z/3hello2'), value: uint8ArrayFromString('3') }

    /**
     * @type {QueryFilter}
     */
    const filter1 = entry => !entry.key.toString().endsWith('hello')

    /**
     * @type {QueryFilter}
     */
    const filter2 = entry => entry.key.toString().endsWith('hello2')

    /**
     * @type {QueryOrder}
     */
    const order1 = (a, b) => {
      if (a.value.toString() < b.value.toString()) {
        return -1
      }
      return 1
    }

    /**
     * @type {QueryOrder}
     */
    const order2 = (a, b) => {
      if (a.value.toString() < b.value.toString()) {
        return 1
      }
      if (a.value.toString() > b.value.toString()) {
        return -1
      }
      return 0
    }

    /** @type {Array<[string, any, any[]|number]>} */
    const tests = [
      ['empty', {}, [hello, world, hello2]],
      ['prefix', { prefix: '/z' }, [world, hello2]],
      ['1 filter', { filters: [filter1] }, [world, hello2]],
      ['2 filters', { filters: [filter1, filter2] }, [hello2]],
      ['limit', { limit: 1 }, 1],
      ['offset', { offset: 1 }, 2],
      ['1 order (1)', { orders: [order1] }, [hello, world, hello2]],
      ['1 order (reverse 1)', { orders: [order2] }, [hello2, world, hello]]
    ]

    before(async () => {
      store = await createStore()

      const b = store.batch()

      b.put(hello.key, hello.value)
      b.put(world.key, world.value)
      b.put(hello2.key, hello2.value)

      return b.commit()
    })

    after(() => cleanup(store))

    tests.forEach(([name, query, expected]) => it(name, async () => {
      let res = await all(store.query(query))

      if (Array.isArray(expected)) {
        if (query.orders == null) {
          expect(res).to.have.length(expected.length)
          /**
           * @param {Pair} a
           * @param {Pair} b
           */
          const s = (a, b) => {
            if (a.key.toString() < b.key.toString()) {
              return 1
            } else {
              return -1
            }
          }
          res = res.sort(s)
          const exp = expected.sort(s)

          res.forEach((r, i) => {
            expect(r.key.toString()).to.be.eql(exp[i].key.toString())

            if (r.value == null) {
              expect(exp[i].value).to.not.exist()
            } else {
              expect(r.value).to.deep.equal(exp[i].value)
            }
          })
        } else {
          expect(res).to.be.eql(expected)
        }
      } else if (typeof expected === 'number') {
        expect(res).to.have.length(expected)
      }
    }))

    it('allows mutating the datastore during a query', async () => {
      const hello3 = { key: new Key('/z/4hello3'), value: uint8ArrayFromString('4') }
      let firstIteration = true

      for await (const {} of store.query({})) { // eslint-disable-line no-empty-pattern
        if (firstIteration) {
          expect(await store.has(hello2.key)).to.be.true()
          await store.delete(hello2.key)
          expect(await store.has(hello2.key)).to.be.false()

          await store.put(hello3.key, hello3.value)
          firstIteration = false
        }
      }

      const results = await all(store.query({}))

      expect(firstIteration).to.be.false('Query did not return anything')
      expect(results.map(result => result.key)).to.have.deep.members([
        hello.key,
        world.key,
        hello3.key
      ])
    })

    it('queries while the datastore is being mutated', async () => {
      const writePromise = store.put(new Key(`/z/key-${Math.random()}`), uint8ArrayFromString('0'))
      const results = await all(store.query({}))
      expect(results.length).to.be.greaterThan(0)
      await writePromise
    })
  })

  describe('queryKeys', () => {
    /** @type {Datastore} */
    let store
    const hello = { key: new Key('/q/1hello'), value: uint8ArrayFromString('1') }
    const world = { key: new Key('/z/2world'), value: uint8ArrayFromString('2') }
    const hello2 = { key: new Key('/z/3hello2'), value: uint8ArrayFromString('3') }

    /**
     * @type {KeyQueryFilter}
     */
    const filter1 = key => !key.toString().endsWith('hello')

    /**
     * @type {KeyQueryFilter}
     */
    const filter2 = key => key.toString().endsWith('hello2')

    /**
     * @type {KeyQueryOrder}
     */
    const order1 = (a, b) => {
      if (a.toString() < b.toString()) {
        return -1
      }
      return 1
    }

    /**
     * @type {KeyQueryOrder}
     */
    const order2 = (a, b) => {
      if (a.toString() < b.toString()) {
        return 1
      }
      if (a.toString() > b.toString()) {
        return -1
      }
      return 0
    }

    /** @type {Array<[string, any, any[]|number]>} */
    const tests = [
      ['empty', {}, [hello.key, world.key, hello2.key]],
      ['prefix', { prefix: '/z' }, [world.key, hello2.key]],
      ['1 filter', { filters: [filter1] }, [world.key, hello2.key]],
      ['2 filters', { filters: [filter1, filter2] }, [hello2.key]],
      ['limit', { limit: 1 }, 1],
      ['offset', { offset: 1 }, 2],
      ['1 order (1)', { orders: [order1] }, [hello.key, world.key, hello2.key]],
      ['1 order (reverse 1)', { orders: [order2] }, [hello2.key, world.key, hello.key]]
    ]

    before(async () => {
      store = await createStore()

      const b = store.batch()

      b.put(hello.key, hello.value)
      b.put(world.key, world.value)
      b.put(hello2.key, hello2.value)

      return b.commit()
    })

    after(() => cleanup(store))

    tests.forEach(([name, query, expected]) => it(name, async () => {
      let res = await all(store.queryKeys(query))

      if (Array.isArray(expected)) {
        if (query.orders == null) {
          expect(res).to.have.length(expected.length)
          /**
           * @type {KeyQueryOrder}
           */
          const s = (a, b) => {
            if (a.toString() < b.toString()) {
              return 1
            } else {
              return -1
            }
          }
          res = res.sort(s)
          const exp = expected.sort(s)

          res.forEach((r, i) => {
            expect(r.toString()).to.be.eql(exp[i].toString())
          })
        } else {
          expect(res).to.be.eql(expected)
        }
      } else if (typeof expected === 'number') {
        expect(res).to.have.length(expected)
      }
    }))

    it('allows mutating the datastore during a query', async () => {
      const hello3 = { key: new Key('/z/4hello3'), value: uint8ArrayFromString('4') }
      let firstIteration = true

      for await (const {} of store.queryKeys({})) { // eslint-disable-line no-empty-pattern
        if (firstIteration) {
          expect(await store.has(hello2.key)).to.be.true()
          await store.delete(hello2.key)
          expect(await store.has(hello2.key)).to.be.false()

          await store.put(hello3.key, hello3.value)
          firstIteration = false
        }
      }

      const results = await all(store.queryKeys({}))

      expect(firstIteration).to.be.false('Query did not return anything')
      expect(results).to.have.deep.members([
        hello.key,
        world.key,
        hello3.key
      ])
    })

    it('queries while the datastore is being mutated', async () => {
      const writePromise = store.put(new Key(`/z/key-${Math.random()}`), uint8ArrayFromString('0'))
      const results = await all(store.queryKeys({}))
      expect(results.length).to.be.greaterThan(0)
      await writePromise
    })
  })

  describe('lifecycle', () => {
    /** @type {Datastore} */
    let store

    before(async () => {
      store = await test.setup()
      if (!store) throw new Error('missing store')
    })

    after(() => cleanup(store))

    it('close and open', async () => {
      await store.close()
      await store.open()
      await store.close()
      await store.open()
    })
  })
}
