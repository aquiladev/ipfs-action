
var fs = require('fs')
var readdirr = require('./readdirr').readdirr


/**
 * Remove directory recursively
 *
 * @param {String} directory path
 * @param {Function} callback
 * @api public
 */

exports.rmdirr = function (dpath, cb) {
  readdirr(dpath, function (err, dirs, files) {
    if (err) return cb(err)
    exports.rmfiles(files, function (err) {
      if (err) return cb(err)
      exports.rmdirs(dirs, cb)
    })
  })
}

/**
 * Remove a list of files
 *
 * @param {Array} files
 * @param {Function} callback
 * @api public
 */

exports.rmfiles = function (files, cb) {
  ;(function loop (index) {
    if (index == files.length) return cb()
    fs.unlink(files[index], function (err) {
      if (err) return cb(err)
      loop(++index)
    })
  }(0))
}

/**
 * Remove a list of directories
 *
 * @param {Array} dirs
 * @param {Function} callback
 * @api public
 */

exports.rmdirs = function (dirs, cb) {
  dirs.sort(desc)
  ;(function loop (index) {
    if (index == dirs.length) return cb()
    fs.rmdir(dirs[index], function (err) {
      if (err) return cb(err)
      loop(++index)
    })
  }(0))
}

/**
 * Sort in descending order
 *
 * @param {String} a
 * @param {String} b
 * @api private
 */

function desc(a, b) {
  if (a > b) return -1
  if (a < b) return  1
  return 0
}
