import * as $protobuf from "protobufjs";
/** Properties of a PeerIdProto. */
export interface IPeerIdProto {

    /** PeerIdProto id */
    id: Uint8Array;

    /** PeerIdProto pubKey */
    pubKey?: (Uint8Array|null);

    /** PeerIdProto privKey */
    privKey?: (Uint8Array|null);
}

/** Represents a PeerIdProto. */
export class PeerIdProto implements IPeerIdProto {

    /**
     * Constructs a new PeerIdProto.
     * @param [p] Properties to set
     */
    constructor(p?: IPeerIdProto);

    /** PeerIdProto id. */
    public id: Uint8Array;

    /** PeerIdProto pubKey. */
    public pubKey: Uint8Array;

    /** PeerIdProto privKey. */
    public privKey: Uint8Array;

    /**
     * Encodes the specified PeerIdProto message. Does not implicitly {@link PeerIdProto.verify|verify} messages.
     * @param m PeerIdProto message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IPeerIdProto, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PeerIdProto message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns PeerIdProto
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): PeerIdProto;

    /**
     * Creates a PeerIdProto message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns PeerIdProto
     */
    public static fromObject(d: { [k: string]: any }): PeerIdProto;

    /**
     * Creates a plain object from a PeerIdProto message. Also converts values to other types if specified.
     * @param m PeerIdProto
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: PeerIdProto, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PeerIdProto to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
