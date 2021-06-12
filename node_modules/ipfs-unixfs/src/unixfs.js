/*eslint-disable*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});

$root.Data = (function() {

    /**
     * Properties of a Data.
     * @exports IData
     * @interface IData
     * @property {Data.DataType} Type Data Type
     * @property {Uint8Array|null} [Data] Data Data
     * @property {number|null} [filesize] Data filesize
     * @property {Array.<number>|null} [blocksizes] Data blocksizes
     * @property {number|null} [hashType] Data hashType
     * @property {number|null} [fanout] Data fanout
     * @property {number|null} [mode] Data mode
     * @property {IUnixTime|null} [mtime] Data mtime
     */

    /**
     * Constructs a new Data.
     * @exports Data
     * @classdesc Represents a Data.
     * @implements IData
     * @constructor
     * @param {IData=} [p] Properties to set
     */
    function Data(p) {
        this.blocksizes = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Data Type.
     * @member {Data.DataType} Type
     * @memberof Data
     * @instance
     */
    Data.prototype.Type = 0;

    /**
     * Data Data.
     * @member {Uint8Array} Data
     * @memberof Data
     * @instance
     */
    Data.prototype.Data = $util.newBuffer([]);

    /**
     * Data filesize.
     * @member {number} filesize
     * @memberof Data
     * @instance
     */
    Data.prototype.filesize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data blocksizes.
     * @member {Array.<number>} blocksizes
     * @memberof Data
     * @instance
     */
    Data.prototype.blocksizes = $util.emptyArray;

    /**
     * Data hashType.
     * @member {number} hashType
     * @memberof Data
     * @instance
     */
    Data.prototype.hashType = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data fanout.
     * @member {number} fanout
     * @memberof Data
     * @instance
     */
    Data.prototype.fanout = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Data mode.
     * @member {number} mode
     * @memberof Data
     * @instance
     */
    Data.prototype.mode = 0;

    /**
     * Data mtime.
     * @member {IUnixTime|null|undefined} mtime
     * @memberof Data
     * @instance
     */
    Data.prototype.mtime = null;

    /**
     * Encodes the specified Data message. Does not implicitly {@link Data.verify|verify} messages.
     * @function encode
     * @memberof Data
     * @static
     * @param {IData} m Data message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Data.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
            w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
            for (var i = 0; i < m.blocksizes.length; ++i)
                w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
            w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
            w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
            w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
            $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
    };

    /**
     * Decodes a Data message from the specified reader or buffer.
     * @function decode
     * @memberof Data
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Data} Data
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Data.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Data();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Type = r.int32();
                break;
            case 2:
                m.Data = r.bytes();
                break;
            case 3:
                m.filesize = r.uint64();
                break;
            case 4:
                if (!(m.blocksizes && m.blocksizes.length))
                    m.blocksizes = [];
                if ((t & 7) === 2) {
                    var c2 = r.uint32() + r.pos;
                    while (r.pos < c2)
                        m.blocksizes.push(r.uint64());
                } else
                    m.blocksizes.push(r.uint64());
                break;
            case 5:
                m.hashType = r.uint64();
                break;
            case 6:
                m.fanout = r.uint64();
                break;
            case 7:
                m.mode = r.uint32();
                break;
            case 8:
                m.mtime = $root.UnixTime.decode(r, r.uint32());
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Type"))
            throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
    };

    /**
     * Creates a Data message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Data
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Data} Data
     */
    Data.fromObject = function fromObject(d) {
        if (d instanceof $root.Data)
            return d;
        var m = new $root.Data();
        switch (d.Type) {
        case "Raw":
        case 0:
            m.Type = 0;
            break;
        case "Directory":
        case 1:
            m.Type = 1;
            break;
        case "File":
        case 2:
            m.Type = 2;
            break;
        case "Metadata":
        case 3:
            m.Type = 3;
            break;
        case "Symlink":
        case 4:
            m.Type = 4;
            break;
        case "HAMTShard":
        case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        if (d.filesize != null) {
            if ($util.Long)
                (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
            else if (typeof d.filesize === "string")
                m.filesize = parseInt(d.filesize, 10);
            else if (typeof d.filesize === "number")
                m.filesize = d.filesize;
            else if (typeof d.filesize === "object")
                m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
        }
        if (d.blocksizes) {
            if (!Array.isArray(d.blocksizes))
                throw TypeError(".Data.blocksizes: array expected");
            m.blocksizes = [];
            for (var i = 0; i < d.blocksizes.length; ++i) {
                if ($util.Long)
                    (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
                else if (typeof d.blocksizes[i] === "string")
                    m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
                else if (typeof d.blocksizes[i] === "number")
                    m.blocksizes[i] = d.blocksizes[i];
                else if (typeof d.blocksizes[i] === "object")
                    m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
            }
        }
        if (d.hashType != null) {
            if ($util.Long)
                (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
            else if (typeof d.hashType === "string")
                m.hashType = parseInt(d.hashType, 10);
            else if (typeof d.hashType === "number")
                m.hashType = d.hashType;
            else if (typeof d.hashType === "object")
                m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
        }
        if (d.fanout != null) {
            if ($util.Long)
                (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
            else if (typeof d.fanout === "string")
                m.fanout = parseInt(d.fanout, 10);
            else if (typeof d.fanout === "number")
                m.fanout = d.fanout;
            else if (typeof d.fanout === "object")
                m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
        }
        if (d.mode != null) {
            m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
            if (typeof d.mtime !== "object")
                throw TypeError(".Data.mtime: object expected");
            m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
    };

    /**
     * Creates a plain object from a Data message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Data
     * @static
     * @param {Data} m Data
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Data.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.blocksizes = [];
        }
        if (o.defaults) {
            d.Type = o.enums === String ? "Raw" : 0;
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.filesize = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.hashType = o.longs === String ? "0" : 0;
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.fanout = o.longs === String ? "0" : 0;
            d.mode = 0;
            d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
            d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
            if (typeof m.filesize === "number")
                d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
            else
                d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
            d.blocksizes = [];
            for (var j = 0; j < m.blocksizes.length; ++j) {
                if (typeof m.blocksizes[j] === "number")
                    d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
                else
                    d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
            }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
            if (typeof m.hashType === "number")
                d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
            else
                d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
            if (typeof m.fanout === "number")
                d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
            else
                d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
            d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
            d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
    };

    /**
     * Converts this Data to JSON.
     * @function toJSON
     * @memberof Data
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    /**
     * DataType enum.
     * @name Data.DataType
     * @enum {number}
     * @property {number} Raw=0 Raw value
     * @property {number} Directory=1 Directory value
     * @property {number} File=2 File value
     * @property {number} Metadata=3 Metadata value
     * @property {number} Symlink=4 Symlink value
     * @property {number} HAMTShard=5 HAMTShard value
     */
    Data.DataType = (function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Raw"] = 0;
        values[valuesById[1] = "Directory"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Metadata"] = 3;
        values[valuesById[4] = "Symlink"] = 4;
        values[valuesById[5] = "HAMTShard"] = 5;
        return values;
    })();

    return Data;
})();

$root.UnixTime = (function() {

    /**
     * Properties of an UnixTime.
     * @exports IUnixTime
     * @interface IUnixTime
     * @property {number} Seconds UnixTime Seconds
     * @property {number|null} [FractionalNanoseconds] UnixTime FractionalNanoseconds
     */

    /**
     * Constructs a new UnixTime.
     * @exports UnixTime
     * @classdesc Represents an UnixTime.
     * @implements IUnixTime
     * @constructor
     * @param {IUnixTime=} [p] Properties to set
     */
    function UnixTime(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * UnixTime Seconds.
     * @member {number} Seconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0,0,false) : 0;

    /**
     * UnixTime FractionalNanoseconds.
     * @member {number} FractionalNanoseconds
     * @memberof UnixTime
     * @instance
     */
    UnixTime.prototype.FractionalNanoseconds = 0;

    /**
     * Encodes the specified UnixTime message. Does not implicitly {@link UnixTime.verify|verify} messages.
     * @function encode
     * @memberof UnixTime
     * @static
     * @param {IUnixTime} m UnixTime message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    UnixTime.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
            w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
    };

    /**
     * Decodes an UnixTime message from the specified reader or buffer.
     * @function decode
     * @memberof UnixTime
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {UnixTime} UnixTime
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    UnixTime.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.UnixTime();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Seconds = r.int64();
                break;
            case 2:
                m.FractionalNanoseconds = r.fixed32();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("Seconds"))
            throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
        return m;
    };

    /**
     * Creates an UnixTime message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof UnixTime
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {UnixTime} UnixTime
     */
    UnixTime.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime)
            return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
            if ($util.Long)
                (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
            else if (typeof d.Seconds === "string")
                m.Seconds = parseInt(d.Seconds, 10);
            else if (typeof d.Seconds === "number")
                m.Seconds = d.Seconds;
            else if (typeof d.Seconds === "object")
                m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
            m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
    };

    /**
     * Creates a plain object from an UnixTime message. Also converts values to other types if specified.
     * @function toObject
     * @memberof UnixTime
     * @static
     * @param {UnixTime} m UnixTime
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    UnixTime.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if ($util.Long) {
                var n = new $util.Long(0, 0, false);
                d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Seconds = o.longs === String ? "0" : 0;
            d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
            if (typeof m.Seconds === "number")
                d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
            else
                d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
        }
        if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
            d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
    };

    /**
     * Converts this UnixTime to JSON.
     * @function toJSON
     * @memberof UnixTime
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    UnixTime.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return UnixTime;
})();

$root.Metadata = (function() {

    /**
     * Properties of a Metadata.
     * @exports IMetadata
     * @interface IMetadata
     * @property {string|null} [MimeType] Metadata MimeType
     */

    /**
     * Constructs a new Metadata.
     * @exports Metadata
     * @classdesc Represents a Metadata.
     * @implements IMetadata
     * @constructor
     * @param {IMetadata=} [p] Properties to set
     */
    function Metadata(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * Metadata MimeType.
     * @member {string} MimeType
     * @memberof Metadata
     * @instance
     */
    Metadata.prototype.MimeType = "";

    /**
     * Encodes the specified Metadata message. Does not implicitly {@link Metadata.verify|verify} messages.
     * @function encode
     * @memberof Metadata
     * @static
     * @param {IMetadata} m Metadata message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    Metadata.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
            w.uint32(10).string(m.MimeType);
        return w;
    };

    /**
     * Decodes a Metadata message from the specified reader or buffer.
     * @function decode
     * @memberof Metadata
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {Metadata} Metadata
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    Metadata.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.Metadata();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.MimeType = r.string();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a Metadata message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof Metadata
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {Metadata} Metadata
     */
    Metadata.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata)
            return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
            m.MimeType = String(d.MimeType);
        }
        return m;
    };

    /**
     * Creates a plain object from a Metadata message. Also converts values to other types if specified.
     * @function toObject
     * @memberof Metadata
     * @static
     * @param {Metadata} m Metadata
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    Metadata.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
            d.MimeType = m.MimeType;
        }
        return d;
    };

    /**
     * Converts this Metadata to JSON.
     * @function toJSON
     * @memberof Metadata
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    Metadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return Metadata;
})();

module.exports = $root;
