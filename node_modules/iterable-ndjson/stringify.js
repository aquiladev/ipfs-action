module.exports = source => (async function * () {
  for await (const obj of source) {
    yield JSON.stringify(obj) + '\n'
  }
})()
