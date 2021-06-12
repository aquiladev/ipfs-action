const BufferList = require('bl/BufferList')

const TypeDefault = {
  string: () => '',
  buffer: () => BufferList()
}

module.exports = async (source, options) => {
  options = options || {}

  if (options.type && !TypeDefault[options.type]) {
    throw new Error(`invalid type "${options.type}"`)
  }

  let res, type
  for await (const chunk of source) {
    if (!res) {
      type = options.type || (typeof chunk === 'string' ? 'string' : 'buffer')
      res = TypeDefault[type]()
    }

    if (type === 'string') {
      res += chunk
    } else {
      res.append(chunk)
    }
  }

  return res || TypeDefault[options.type || 'buffer']()
}
