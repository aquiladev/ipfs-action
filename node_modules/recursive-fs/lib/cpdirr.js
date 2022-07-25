
var fs = require('fs')
var path = require('path')
var readdirr = require('./readdirr').readdirr


/**
 * Copy directory recursively
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Function} callback
 * @api public
 */

exports.cpdirr = function (spath, tpath, cb) {
  readdirr(spath, function (err, dirs, files) {
    if (err) return cb(err)
    exports.cpdirs(spath, tpath, dirs, function (err) {
      if (err) return cb(err)
      exports.cpfiles(spath, tpath, files, function (err) {
        if (err) return cb(err)
        cb()
      })
    })
  })
}

/**
 * Copy a list of directories
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Array} dirs
 * @param {Function} callback
 * @api public
 */

exports.cpdirs = function (spath, tpath, dirs, cb) {
  dirs.sort()
  ;(function loop (index) {
    if (index == dirs.length) return cb()
    var rpath = path.relative(spath, dirs[index])
    rpath = path.join(tpath, rpath)
    fs.exists(rpath, function (exists) {
      if (exists) return loop(++index)
      fs.mkdir(rpath, function (err) {
        if (err) return cb(err)
        loop(++index)
      })
    })
  }(0))
}

/**
 * Copy a list of files
 *
 * @param {String} source path
 * @param {String} target path
 * @param {Array} files
 * @param {Function} callback
 * @api public
 */

exports.cpfiles = function (spath, tpath, files, cb) {
  ;(function loop (index) {
    if (index == files.length) return cb()
    fs.readFile(files[index], function (err, data) {
      if (err) return cb(err)
      var rpath = path.relative(spath, files[index])
      rpath = path.join(tpath, rpath)
      fs.writeFile(rpath, data, function (err) {
        if (err) return cb(err)
        loop(++index)
      })
    })
  }(0))
}
