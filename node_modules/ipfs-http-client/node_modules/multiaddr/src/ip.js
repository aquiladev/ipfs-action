'use strict'

const { Buffer } = require('buffer')
const isIp = require('is-ip')

const isIP = isIp
const isV4 = isIp.v4
const isV6 = isIp.v6

// Copied from https://github.com/indutny/node-ip/blob/master/lib/ip.js#L7
const toBuffer = function (ip, buff, offset) {
  offset = ~~offset

  var result

  if (isV4(ip)) {
    result = buff || Buffer.alloc(offset + 4)
    ip.split(/\./g).map(function (byte) {
      result[offset++] = parseInt(byte, 10) & 0xff
    })
  } else if (isV6(ip)) {
    var sections = ip.split(':', 8)

    var i
    for (i = 0; i < sections.length; i++) {
      var isv4 = isV4(sections[i])
      var v4Buffer

      if (isv4) {
        v4Buffer = toBuffer(sections[i])
        sections[i] = v4Buffer.slice(0, 2).toString('hex')
      }

      if (v4Buffer && ++i < 8) {
        sections.splice(i, 0, v4Buffer.slice(2, 4).toString('hex'))
      }
    }

    if (sections[0] === '') {
      while (sections.length < 8) sections.unshift('0')
    } else if (sections[sections.length - 1] === '') {
      while (sections.length < 8) sections.push('0')
    } else if (sections.length < 8) {
      for (i = 0; i < sections.length && sections[i] !== ''; i++);
      var argv = [i, '1']
      for (i = 9 - sections.length; i > 0; i--) {
        argv.push('0')
      }
      sections.splice.apply(sections, argv)
    }

    result = buff || Buffer.alloc(offset + 16)
    for (i = 0; i < sections.length; i++) {
      var word = parseInt(sections[i], 16)
      result[offset++] = (word >> 8) & 0xff
      result[offset++] = word & 0xff
    }
  }

  if (!result) {
    throw Error('Invalid ip address: ' + ip)
  }

  return result
}

// Copied from https://github.com/indutny/node-ip/blob/master/lib/ip.js#L63
const toString = function (buff, offset, length) {
  offset = ~~offset
  length = length || (buff.length - offset)

  var result = []
  var string
  if (length === 4) {
    // IPv4
    for (let i = 0; i < length; i++) {
      result.push(buff[offset + i])
    }
    string = result.join('.')
  } else if (length === 16) {
    // IPv6
    for (let i = 0; i < length; i += 2) {
      result.push(buff.readUInt16BE(offset + i).toString(16))
    }
    string = result.join(':')
    string = string.replace(/(^|:)0(:0)*:0(:|$)/, '$1::$3')
    string = string.replace(/:{3,4}/, '::')
  }

  return string
}

module.exports = {
  isIP,
  isV4,
  isV6,
  toBuffer,
  toString
}
