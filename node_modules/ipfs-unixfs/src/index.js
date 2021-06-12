'use strict'

const {
  Data: PBData
} = require('./unixfs')
const errcode = require('err-code')

/**
 * @typedef {import('./types').Mtime} Mtime
 * @typedef {import('./types').MtimeLike} MtimeLike
 */

const types = [
  'raw',
  'directory',
  'file',
  'metadata',
  'symlink',
  'hamt-sharded-directory'
]

const dirTypes = [
  'directory',
  'hamt-sharded-directory'
]

const DEFAULT_FILE_MODE = parseInt('0644', 8)
const DEFAULT_DIRECTORY_MODE = parseInt('0755', 8)

/**
 * @param {string | number | undefined} [mode]
 */
function parseMode (mode) {
  if (mode == null) {
    return undefined
  }

  if (typeof mode === 'number') {
    return mode & 0xFFF
  }

  mode = mode.toString()

  if (mode.substring(0, 1) === '0') {
    // octal string
    return parseInt(mode, 8) & 0xFFF
  }

  // decimal string
  return parseInt(mode, 10) & 0xFFF
}

/**
 * @param {any} input
 */
function parseMtime (input) {
  if (input == null) {
    return undefined
  }

  /** @type {Mtime | undefined} */
  let mtime

  // { secs, nsecs }
  if (input.secs != null) {
    mtime = {
      secs: input.secs,
      nsecs: input.nsecs
    }
  }

  // UnixFS TimeSpec
  if (input.Seconds != null) {
    mtime = {
      secs: input.Seconds,
      nsecs: input.FractionalNanoseconds
    }
  }

  // process.hrtime()
  if (Array.isArray(input)) {
    mtime = {
      secs: input[0],
      nsecs: input[1]
    }
  }

  // Javascript Date
  if (input instanceof Date) {
    const ms = input.getTime()
    const secs = Math.floor(ms / 1000)

    mtime = {
      secs: secs,
      nsecs: (ms - (secs * 1000)) * 1000
    }
  }

  /*
  TODO: https://github.com/ipfs/aegir/issues/487

  // process.hrtime.bigint()
  if (input instanceof BigInt) {
    const secs = input / BigInt(1e9)
    const nsecs = input - (secs * BigInt(1e9))

    mtime = {
      secs: parseInt(secs.toString()),
      nsecs: parseInt(nsecs.toString())
    }
  }
  */

  if (!Object.prototype.hasOwnProperty.call(mtime, 'secs')) {
    return undefined
  }

  if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
    throw errcode(new Error('mtime-nsecs must be within the range [0,999999999]'), 'ERR_INVALID_MTIME_NSECS')
  }

  return mtime
}

class Data {
  /**
   * Decode from protobuf https://github.com/ipfs/specs/blob/master/UNIXFS.md
   *
   * @param {Uint8Array} marshaled
   */
  static unmarshal (marshaled) {
    const message = PBData.decode(marshaled)
    const decoded = PBData.toObject(message, {
      defaults: false,
      arrays: true,
      longs: Number,
      objects: false
    })

    const data = new Data({
      type: types[decoded.Type],
      data: decoded.Data,
      blockSizes: decoded.blocksizes,
      mode: decoded.mode,
      mtime: decoded.mtime
        ? {
            secs: decoded.mtime.Seconds,
            nsecs: decoded.mtime.FractionalNanoseconds
          }
        : undefined
    })

    // make sure we honour the original mode
    data._originalMode = decoded.mode || 0

    return data
  }

  /**
   * @param {object} [options]
   * @param {string} [options.type='file']
   * @param {Uint8Array} [options.data]
   * @param {number[]} [options.blockSizes]
   * @param {number} [options.hashType]
   * @param {number} [options.fanout]
   * @param {MtimeLike | null} [options.mtime]
   * @param {number | string} [options.mode]
   */
  constructor (options = {
    type: 'file'
  }) {
    const {
      type,
      data,
      blockSizes,
      hashType,
      fanout,
      mtime,
      mode
    } = options

    if (type && !types.includes(type)) {
      throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    this.type = type || 'file'
    this.data = data
    this.hashType = hashType
    this.fanout = fanout

    /** @type {number[]} */
    this.blockSizes = blockSizes || []
    this._originalMode = 0
    this.mode = parseMode(mode)

    if (mtime) {
      this.mtime = parseMtime(mtime)

      if (this.mtime && !this.mtime.nsecs) {
        this.mtime.nsecs = 0
      }
    }
  }

  /**
   * @param {number | undefined} mode
   */
  set mode (mode) {
    this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE

    const parsedMode = parseMode(mode)

    if (parsedMode !== undefined) {
      this._mode = parsedMode
    }
  }

  /**
   * @returns {number | undefined}
   */
  get mode () {
    return this._mode
  }

  isDirectory () {
    return Boolean(this.type && dirTypes.includes(this.type))
  }

  /**
   * @param {number} size
   */
  addBlockSize (size) {
    this.blockSizes.push(size)
  }

  /**
   * @param {number} index
   */
  removeBlockSize (index) {
    this.blockSizes.splice(index, 1)
  }

  /**
   * Returns `0` for directories or `data.length + sum(blockSizes)` for everything else
   */
  fileSize () {
    if (this.isDirectory()) {
      // dirs don't have file size
      return 0
    }

    let sum = 0
    this.blockSizes.forEach((size) => {
      sum += size
    })

    if (this.data) {
      sum += this.data.length
    }

    return sum
  }

  /**
   * encode to protobuf Uint8Array
   */
  marshal () {
    let type

    switch (this.type) {
      case 'raw': type = PBData.DataType.Raw; break
      case 'directory': type = PBData.DataType.Directory; break
      case 'file': type = PBData.DataType.File; break
      case 'metadata': type = PBData.DataType.Metadata; break
      case 'symlink': type = PBData.DataType.Symlink; break
      case 'hamt-sharded-directory': type = PBData.DataType.HAMTShard; break
      default:
        throw errcode(new Error('Type: ' + type + ' is not valid'), 'ERR_INVALID_TYPE')
    }

    let data = this.data

    if (!this.data || !this.data.length) {
      data = undefined
    }

    let mode

    if (this.mode != null) {
      mode = (this._originalMode & 0xFFFFF000) | (parseMode(this.mode) || 0)

      if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
        mode = undefined
      }

      if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
        mode = undefined
      }
    }

    let mtime

    if (this.mtime != null) {
      const parsed = parseMtime(this.mtime)

      if (parsed) {
        mtime = {
          Seconds: parsed.secs,
          FractionalNanoseconds: parsed.nsecs
        }

        if (mtime.FractionalNanoseconds === 0) {
          delete mtime.FractionalNanoseconds
        }
      }
    }

    const pbData = {
      Type: type,
      Data: data,
      filesize: this.isDirectory() ? undefined : this.fileSize(),
      blocksizes: this.blockSizes,
      hashType: this.hashType,
      fanout: this.fanout,
      mode,
      mtime
    }

    return PBData.encode(pbData).finish()
  }
}

module.exports = {
  UnixFS: Data,
  parseMode,
  parseMtime
}
