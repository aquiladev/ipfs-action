
var fs = require('fs')
var path = require('path')


/**
 * Read directory recursively
 *
 * @param {String} directory path
 * @param {Function} callback
 * @return {Arrays} dirs & files
 * @api public
 */

exports.readdirr = function (dpath, cb) {
  var dirs = [], files = []
  dirs.push(dpath)
  ;(function loop (index) {
    if (index == dirs.length) return cb(null, dirs, files)
    fs.readdir(dirs[index], function (err, _files) {
      if (err) return cb(err)
      getstat(dirs[index], _files, function (err) {
        if (err) return cb(err)
        loop(++index)
      })
    })
  }(0))

  /**
   * Get stat
   *
   * @param {String} directory path
   * @param {Array} files
   * @param {Function} callback
   * @api private
   */
  function getstat (dpath, _files, cb) {
    ;(function loop (index) {
      if (index == _files.length) return cb()
      var fpath = path.join(dpath, _files[index])
      fs.stat(fpath, function (err, stats) {
        if (err) return cb(err)
        if (stats.isDirectory()) {
          dirs.push(fpath)
        } else {
          files.push(fpath)
        }
        loop(++index)
      })
    }(0))
  }
}
