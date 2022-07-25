'use strict'

const { Buffer } = require('buffer')
const ip = require('./ip')
const protocols = require('./protocols-table')
const CID = require('cids')
const multibase = require('multibase')
const varint = require('varint')

module.exports = Convert

// converts (serializes) addresses
function Convert (proto, a) {
  if (a instanceof Buffer) {
    return Convert.toString(proto, a)
  } else {
    return Convert.toBuffer(proto, a)
  }
}

Convert.toString = function convertToString (proto, buf) {
  proto = protocols(proto)
  switch (proto.code) {
    case 4: // ipv4
    case 41: // ipv6
      return buf2ip(buf)

    case 6: // tcp
    case 273: // udp
    case 33: // dccp
    case 132: // sctp
      return buf2port(buf)

    case 53: // dns
    case 54: // dns4
    case 55: // dns6
    case 56: // dnsaddr
    case 400: // unix
    case 777: // memory
      return buf2str(buf)

    case 421: // ipfs
      return buf2mh(buf)
    case 444: // onion
      return buf2onion(buf)
    case 445: // onion3
      return buf2onion(buf)
    default:
      return buf.toString('hex') // no clue. convert to hex
  }
}

Convert.toBuffer = function convertToBuffer (proto, str) {
  proto = protocols(proto)
  switch (proto.code) {
    case 4: // ipv4
      return ip2buf(str)
    case 41: // ipv6
      return ip2buf(str)

    case 6: // tcp
    case 273: // udp
    case 33: // dccp
    case 132: // sctp
      return port2buf(parseInt(str, 10))

    case 53: // dns
    case 54: // dns4
    case 55: // dns6
    case 56: // dnsaddr
    case 400: // unix
    case 777: // memory
      return str2buf(str)

    case 421: // ipfs
      return mh2buf(str)
    case 444: // onion
      return onion2buf(str)
    case 445: // onion3
      return onion32buf(str)
    default:
      return Buffer.from(str, 'hex') // no clue. convert from hex
  }
}

function ip2buf (ipString) {
  if (!ip.isIP(ipString)) {
    throw new Error('invalid ip address')
  }
  return ip.toBuffer(ipString)
}

function buf2ip (ipBuff) {
  const ipString = ip.toString(ipBuff)
  if (!ipString || !ip.isIP(ipString)) {
    throw new Error('invalid ip address')
  }
  return ipString
}

function port2buf (port) {
  const buf = Buffer.alloc(2)
  buf.writeUInt16BE(port, 0)
  return buf
}

function buf2port (buf) {
  return buf.readUInt16BE(0)
}

function str2buf (str) {
  const buf = Buffer.from(str)
  const size = Buffer.from(varint.encode(buf.length))
  return Buffer.concat([size, buf])
}

function buf2str (buf) {
  const size = varint.decode(buf)
  buf = buf.slice(varint.decode.bytes)

  if (buf.length !== size) {
    throw new Error('inconsistent lengths')
  }

  return buf.toString()
}

function mh2buf (hash) {
  // the address is a varint prefixed multihash string representation
  const mh = new CID(hash).multihash
  const size = Buffer.from(varint.encode(mh.length))
  return Buffer.concat([size, mh])
}

function buf2mh (buf) {
  const size = varint.decode(buf)
  const address = buf.slice(varint.decode.bytes)

  if (address.length !== size) {
    throw new Error('inconsistent lengths')
  }
  return multibase.encode('base58btc', address).toString().slice(1)
}

function onion2buf (str) {
  const addr = str.split(':')
  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number')
  }
  if (addr[0].length !== 16) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion address.')
  }

  // onion addresses do not include the multibase prefix, add it before decoding
  const buf = multibase.decode('b' + addr[0])

  // onion port number
  const port = parseInt(addr[1], 10)
  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)')
  }
  const portBuf = port2buf(port)
  return Buffer.concat([buf, portBuf])
}

function onion32buf (str) {
  const addr = str.split(':')
  if (addr.length !== 2) {
    throw new Error('failed to parse onion addr: ' + addr + ' does not contain a port number')
  }
  if (addr[0].length !== 56) {
    throw new Error('failed to parse onion addr: ' + addr[0] + ' not a Tor onion3 address.')
  }
  // onion addresses do not include the multibase prefix, add it before decoding
  const buf = multibase.decode('b' + addr[0])

  // onion port number
  const port = parseInt(addr[1], 10)
  if (port < 1 || port > 65536) {
    throw new Error('Port number is not in range(1, 65536)')
  }
  const portBuf = port2buf(port)
  return Buffer.concat([buf, portBuf])
}

function buf2onion (buf) {
  const addrBytes = buf.slice(0, buf.length - 2)
  const portBytes = buf.slice(buf.length - 2)
  const addr = multibase.encode('base32', addrBytes).toString().slice(1)
  const port = buf2port(portBytes)
  return addr + ':' + port
}
