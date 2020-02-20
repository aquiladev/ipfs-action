const { Writable, pipeline } = require('stream')

// Promisified pipeline
function pipe (...streams) {
  return new Promise((resolve, reject) => {
    pipeline(...streams, err => {
      if (err) return reject(err)
      resolve()
    })
  })
}

exports.pipe = pipe

// Pipe a bunch of streams together and collect the results
exports.collect = async (...streams) => {
  const chunks = []
  const collector = new Writable({
    write (chunk, enc, cb) {
      chunks.push(chunk)
      cb()
    }
  })

  await pipe(...[...streams, collector])
  return chunks
}
