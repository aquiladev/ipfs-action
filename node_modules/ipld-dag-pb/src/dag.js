/*eslint-disable*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.PBLink = (function() {

    /**
     * Properties of a PBLink.
     * @exports IPBLink
     * @interface IPBLink
     * @property {Uint8Array|null} [Hash] PBLink Hash
     * @property {string|null} [Name] PBLink Name
     * @property {number|null} [Tsize] PBLink Tsize
     */

    /**
     * Constructs a new PBLink.
     * @exports PBLink
     * @classdesc Represents a PBLink.
     * @implements IPBLink
     * @constructor
     * @param {IPBLink=} [p] Properties to set
     */
    function PBLink(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PBLink Hash.
     * @member {Uint8Array} Hash
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Hash = $util.newBuffer([]);

    /**
     * PBLink Name.
     * @member {string} Name
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Name = "";

    /**
     * PBLink Tsize.
     * @member {number} Tsize
     * @memberof PBLink
     * @instance
     */
    PBLink.prototype.Tsize = $util.Long ? $util.Long.fromBits(0,0,true) : 0;

    /**
     * Encodes the specified PBLink message. Does not implicitly {@link PBLink.verify|verify} messages.
     * @function encode
     * @memberof PBLink
     * @static
     * @param {IPBLink} m PBLink message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PBLink.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.Hash != null && Object.hasOwnProperty.call(m, "Hash"))
            w.uint32(10).bytes(m.Hash);
        if (m.Name != null && Object.hasOwnProperty.call(m, "Name"))
            w.uint32(18).string(m.Name);
        if (m.Tsize != null && Object.hasOwnProperty.call(m, "Tsize"))
            w.uint32(24).uint64(m.Tsize);
        return w;
    };

    /**
     * Decodes a PBLink message from the specified reader or buffer.
     * @function decode
     * @memberof PBLink
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PBLink} PBLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PBLink.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PBLink();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.Hash = r.bytes();
                break;
            case 2:
                m.Name = r.string();
                break;
            case 3:
                m.Tsize = r.uint64();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a PBLink message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PBLink
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PBLink} PBLink
     */
    PBLink.fromObject = function fromObject(d) {
        if (d instanceof $root.PBLink)
            return d;
        var m = new $root.PBLink();
        if (d.Hash != null) {
            if (typeof d.Hash === "string")
                $util.base64.decode(d.Hash, m.Hash = $util.newBuffer($util.base64.length(d.Hash)), 0);
            else if (d.Hash.length)
                m.Hash = d.Hash;
        }
        if (d.Name != null) {
            m.Name = String(d.Name);
        }
        if (d.Tsize != null) {
            if ($util.Long)
                (m.Tsize = $util.Long.fromValue(d.Tsize)).unsigned = true;
            else if (typeof d.Tsize === "string")
                m.Tsize = parseInt(d.Tsize, 10);
            else if (typeof d.Tsize === "number")
                m.Tsize = d.Tsize;
            else if (typeof d.Tsize === "object")
                m.Tsize = new $util.LongBits(d.Tsize.low >>> 0, d.Tsize.high >>> 0).toNumber(true);
        }
        return m;
    };

    /**
     * Creates a plain object from a PBLink message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PBLink
     * @static
     * @param {PBLink} m PBLink
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PBLink.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if (o.bytes === String)
                d.Hash = "";
            else {
                d.Hash = [];
                if (o.bytes !== Array)
                    d.Hash = $util.newBuffer(d.Hash);
            }
            d.Name = "";
            if ($util.Long) {
                var n = new $util.Long(0, 0, true);
                d.Tsize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
            } else
                d.Tsize = o.longs === String ? "0" : 0;
        }
        if (m.Hash != null && m.hasOwnProperty("Hash")) {
            d.Hash = o.bytes === String ? $util.base64.encode(m.Hash, 0, m.Hash.length) : o.bytes === Array ? Array.prototype.slice.call(m.Hash) : m.Hash;
        }
        if (m.Name != null && m.hasOwnProperty("Name")) {
            d.Name = m.Name;
        }
        if (m.Tsize != null && m.hasOwnProperty("Tsize")) {
            if (typeof m.Tsize === "number")
                d.Tsize = o.longs === String ? String(m.Tsize) : m.Tsize;
            else
                d.Tsize = o.longs === String ? $util.Long.prototype.toString.call(m.Tsize) : o.longs === Number ? new $util.LongBits(m.Tsize.low >>> 0, m.Tsize.high >>> 0).toNumber(true) : m.Tsize;
        }
        return d;
    };

    /**
     * Converts this PBLink to JSON.
     * @function toJSON
     * @memberof PBLink
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PBLink.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PBLink;
})();

$root.PBNode = (function() {

    /**
     * Properties of a PBNode.
     * @exports IPBNode
     * @interface IPBNode
     * @property {Array.<IPBLink>|null} [Links] PBNode Links
     * @property {Uint8Array|null} [Data] PBNode Data
     */

    /**
     * Constructs a new PBNode.
     * @exports PBNode
     * @classdesc Represents a PBNode.
     * @implements IPBNode
     * @constructor
     * @param {IPBNode=} [p] Properties to set
     */
    function PBNode(p) {
        this.Links = [];
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PBNode Links.
     * @member {Array.<IPBLink>} Links
     * @memberof PBNode
     * @instance
     */
    PBNode.prototype.Links = $util.emptyArray;

    /**
     * PBNode Data.
     * @member {Uint8Array} Data
     * @memberof PBNode
     * @instance
     */
    PBNode.prototype.Data = $util.newBuffer([]);

    /**
     * Encodes the specified PBNode message. Does not implicitly {@link PBNode.verify|verify} messages.
     * @function encode
     * @memberof PBNode
     * @static
     * @param {IPBNode} m PBNode message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PBNode.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
            w.uint32(10).bytes(m.Data);
        if (m.Links != null && m.Links.length) {
            for (var i = 0; i < m.Links.length; ++i)
                $root.PBLink.encode(m.Links[i], w.uint32(18).fork()).ldelim();
        }
        return w;
    };

    /**
     * Decodes a PBNode message from the specified reader or buffer.
     * @function decode
     * @memberof PBNode
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PBNode} PBNode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PBNode.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PBNode();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 2:
                if (!(m.Links && m.Links.length))
                    m.Links = [];
                m.Links.push($root.PBLink.decode(r, r.uint32()));
                break;
            case 1:
                m.Data = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        return m;
    };

    /**
     * Creates a PBNode message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PBNode
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PBNode} PBNode
     */
    PBNode.fromObject = function fromObject(d) {
        if (d instanceof $root.PBNode)
            return d;
        var m = new $root.PBNode();
        if (d.Links) {
            if (!Array.isArray(d.Links))
                throw TypeError(".PBNode.Links: array expected");
            m.Links = [];
            for (var i = 0; i < d.Links.length; ++i) {
                if (typeof d.Links[i] !== "object")
                    throw TypeError(".PBNode.Links: object expected");
                m.Links[i] = $root.PBLink.fromObject(d.Links[i]);
            }
        }
        if (d.Data != null) {
            if (typeof d.Data === "string")
                $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
            else if (d.Data.length)
                m.Data = d.Data;
        }
        return m;
    };

    /**
     * Creates a plain object from a PBNode message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PBNode
     * @static
     * @param {PBNode} m PBNode
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PBNode.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.arrays || o.defaults) {
            d.Links = [];
        }
        if (o.defaults) {
            if (o.bytes === String)
                d.Data = "";
            else {
                d.Data = [];
                if (o.bytes !== Array)
                    d.Data = $util.newBuffer(d.Data);
            }
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
            d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.Links && m.Links.length) {
            d.Links = [];
            for (var j = 0; j < m.Links.length; ++j) {
                d.Links[j] = $root.PBLink.toObject(m.Links[j], o);
            }
        }
        return d;
    };

    /**
     * Converts this PBNode to JSON.
     * @function toJSON
     * @memberof PBNode
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PBNode.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PBNode;
})();

module.exports = $root;
