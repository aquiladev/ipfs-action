const Path = require('path')

module.exports = {
  mode: 'development',
  target: 'web',
  entry: ['./test.js'],
  node: {
    fs: 'empty'
  },
  output: {
    path: Path.resolve(__dirname, './output'),
    filename: 'test.js'
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['*', '.js']
  }
}
