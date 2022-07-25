/*eslint-disable*/
"use strict";

var $protobuf = require("protobufjs/minimal");

// Common aliases
var $Reader = $protobuf.Reader, $Writer = $protobuf.Writer, $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["libp2p-peer-id"] || ($protobuf.roots["libp2p-peer-id"] = {});

$root.PeerIdProto = (function() {

    /**
     * Properties of a PeerIdProto.
     * @exports IPeerIdProto
     * @interface IPeerIdProto
     * @property {Uint8Array} id PeerIdProto id
     * @property {Uint8Array|null} [pubKey] PeerIdProto pubKey
     * @property {Uint8Array|null} [privKey] PeerIdProto privKey
     */

    /**
     * Constructs a new PeerIdProto.
     * @exports PeerIdProto
     * @classdesc Represents a PeerIdProto.
     * @implements IPeerIdProto
     * @constructor
     * @param {IPeerIdProto=} [p] Properties to set
     */
    function PeerIdProto(p) {
        if (p)
            for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
                if (p[ks[i]] != null)
                    this[ks[i]] = p[ks[i]];
    }

    /**
     * PeerIdProto id.
     * @member {Uint8Array} id
     * @memberof PeerIdProto
     * @instance
     */
    PeerIdProto.prototype.id = $util.newBuffer([]);

    /**
     * PeerIdProto pubKey.
     * @member {Uint8Array} pubKey
     * @memberof PeerIdProto
     * @instance
     */
    PeerIdProto.prototype.pubKey = $util.newBuffer([]);

    /**
     * PeerIdProto privKey.
     * @member {Uint8Array} privKey
     * @memberof PeerIdProto
     * @instance
     */
    PeerIdProto.prototype.privKey = $util.newBuffer([]);

    /**
     * Encodes the specified PeerIdProto message. Does not implicitly {@link PeerIdProto.verify|verify} messages.
     * @function encode
     * @memberof PeerIdProto
     * @static
     * @param {IPeerIdProto} m PeerIdProto message or plain object to encode
     * @param {$protobuf.Writer} [w] Writer to encode to
     * @returns {$protobuf.Writer} Writer
     */
    PeerIdProto.encode = function encode(m, w) {
        if (!w)
            w = $Writer.create();
        w.uint32(10).bytes(m.id);
        if (m.pubKey != null && Object.hasOwnProperty.call(m, "pubKey"))
            w.uint32(18).bytes(m.pubKey);
        if (m.privKey != null && Object.hasOwnProperty.call(m, "privKey"))
            w.uint32(26).bytes(m.privKey);
        return w;
    };

    /**
     * Decodes a PeerIdProto message from the specified reader or buffer.
     * @function decode
     * @memberof PeerIdProto
     * @static
     * @param {$protobuf.Reader|Uint8Array} r Reader or buffer to decode from
     * @param {number} [l] Message length if known beforehand
     * @returns {PeerIdProto} PeerIdProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    PeerIdProto.decode = function decode(r, l) {
        if (!(r instanceof $Reader))
            r = $Reader.create(r);
        var c = l === undefined ? r.len : r.pos + l, m = new $root.PeerIdProto();
        while (r.pos < c) {
            var t = r.uint32();
            switch (t >>> 3) {
            case 1:
                m.id = r.bytes();
                break;
            case 2:
                m.pubKey = r.bytes();
                break;
            case 3:
                m.privKey = r.bytes();
                break;
            default:
                r.skipType(t & 7);
                break;
            }
        }
        if (!m.hasOwnProperty("id"))
            throw $util.ProtocolError("missing required 'id'", { instance: m });
        return m;
    };

    /**
     * Creates a PeerIdProto message from a plain object. Also converts values to their respective internal types.
     * @function fromObject
     * @memberof PeerIdProto
     * @static
     * @param {Object.<string,*>} d Plain object
     * @returns {PeerIdProto} PeerIdProto
     */
    PeerIdProto.fromObject = function fromObject(d) {
        if (d instanceof $root.PeerIdProto)
            return d;
        var m = new $root.PeerIdProto();
        if (d.id != null) {
            if (typeof d.id === "string")
                $util.base64.decode(d.id, m.id = $util.newBuffer($util.base64.length(d.id)), 0);
            else if (d.id.length)
                m.id = d.id;
        }
        if (d.pubKey != null) {
            if (typeof d.pubKey === "string")
                $util.base64.decode(d.pubKey, m.pubKey = $util.newBuffer($util.base64.length(d.pubKey)), 0);
            else if (d.pubKey.length)
                m.pubKey = d.pubKey;
        }
        if (d.privKey != null) {
            if (typeof d.privKey === "string")
                $util.base64.decode(d.privKey, m.privKey = $util.newBuffer($util.base64.length(d.privKey)), 0);
            else if (d.privKey.length)
                m.privKey = d.privKey;
        }
        return m;
    };

    /**
     * Creates a plain object from a PeerIdProto message. Also converts values to other types if specified.
     * @function toObject
     * @memberof PeerIdProto
     * @static
     * @param {PeerIdProto} m PeerIdProto
     * @param {$protobuf.IConversionOptions} [o] Conversion options
     * @returns {Object.<string,*>} Plain object
     */
    PeerIdProto.toObject = function toObject(m, o) {
        if (!o)
            o = {};
        var d = {};
        if (o.defaults) {
            if (o.bytes === String)
                d.id = "";
            else {
                d.id = [];
                if (o.bytes !== Array)
                    d.id = $util.newBuffer(d.id);
            }
            if (o.bytes === String)
                d.pubKey = "";
            else {
                d.pubKey = [];
                if (o.bytes !== Array)
                    d.pubKey = $util.newBuffer(d.pubKey);
            }
            if (o.bytes === String)
                d.privKey = "";
            else {
                d.privKey = [];
                if (o.bytes !== Array)
                    d.privKey = $util.newBuffer(d.privKey);
            }
        }
        if (m.id != null && m.hasOwnProperty("id")) {
            d.id = o.bytes === String ? $util.base64.encode(m.id, 0, m.id.length) : o.bytes === Array ? Array.prototype.slice.call(m.id) : m.id;
        }
        if (m.pubKey != null && m.hasOwnProperty("pubKey")) {
            d.pubKey = o.bytes === String ? $util.base64.encode(m.pubKey, 0, m.pubKey.length) : o.bytes === Array ? Array.prototype.slice.call(m.pubKey) : m.pubKey;
        }
        if (m.privKey != null && m.hasOwnProperty("privKey")) {
            d.privKey = o.bytes === String ? $util.base64.encode(m.privKey, 0, m.privKey.length) : o.bytes === Array ? Array.prototype.slice.call(m.privKey) : m.privKey;
        }
        return d;
    };

    /**
     * Converts this PeerIdProto to JSON.
     * @function toJSON
     * @memberof PeerIdProto
     * @instance
     * @returns {Object.<string,*>} JSON object
     */
    PeerIdProto.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
    };

    return PeerIdProto;
})();

module.exports = $root;
