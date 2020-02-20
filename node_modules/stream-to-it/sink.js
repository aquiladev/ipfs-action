const getIterator = require('get-iterator')
const defer = require('p-defer')

module.exports = writable => async source => {
  source = getIterator(source)

  const errPromise = defer()
  const closePromise = defer()
  const endingPromise = defer()
  const finishPromise = defer()
  let drainPromise

  const errorHandler = err => errPromise.reject(err)
  const closeHandler = () => closePromise.resolve({ closed: true })
  const finishHandler = () => finishPromise.resolve({ finished: true })
  const drainHandler = () => {
    if (drainPromise) drainPromise.resolve({ drained: true })
  }

  // There's no event to determine the start of a call to .end()
  const _end = writable.end.bind(writable)
  writable.end = (...args) => {
    endingPromise.resolve({ ending: true })
    return _end(...args)
  }

  writable
    .on('error', errorHandler)
    .on('close', closeHandler)
    .on('finish', finishHandler)
    .on('drain', drainHandler)

  const getNext = async () => {
    try {
      return source.next()
    } catch (err) {
      writable.destroy(err)
      return errPromise.promise
    }
  }

  try {
    while (true) {
      // Race the iterator and the error, close and finish listener
      const result = await Promise.race([
        errPromise.promise,
        closePromise.promise,
        endingPromise.promise,
        finishPromise.promise,
        getNext()
      ])

      if (result.closed || result.finished) {
        break
      }

      // .end() was called, waiting on flush (finish event)
      if (result.ending) {
        await Promise.race([
          errPromise.promise,
          // TODO: do we need to wait on close? If slow end and destroy is
          // called then what is emitted? close or finish?
          closePromise.promise,
          finishPromise.promise
        ])
        break
      }

      // If destroyed, race err & close to determine reason & then throw/break
      if (writable.destroyed) {
        await Promise.race([
          errPromise.promise,
          closePromise.promise
        ])
        break
      }

      if (result.done) {
        writable.end()
        await Promise.race([
          errPromise.promise,
          // TODO: do we need to wait on close? If slow end and destroy is
          // called then what is emitted? close or finish?
          closePromise.promise,
          finishPromise.promise
        ])
        break
      }

      if (!writable.write(result.value)) {
        drainPromise = defer()
        await Promise.race([
          errPromise.promise,
          closePromise.promise,
          finishPromise.promise,
          drainPromise.promise
        ])
      }
    }
  } finally {
    writable
      .removeListener('error', errorHandler)
      .removeListener('close', closeHandler)
      .removeListener('finish', finishHandler)
      .removeListener('drain', drainHandler)

    // End the iterator if it is a generator
    if (typeof source.return === 'function') {
      await source.return()
    }
  }
}
