import * as $protobuf from "protobufjs";
/** Properties of a PBLink. */
export interface IPBLink {

    /** PBLink Hash */
    Hash?: (Uint8Array|null);

    /** PBLink Name */
    Name?: (string|null);

    /** PBLink Tsize */
    Tsize?: (number|null);
}

/** Represents a PBLink. */
export class PBLink implements IPBLink {

    /**
     * Constructs a new PBLink.
     * @param [p] Properties to set
     */
    constructor(p?: IPBLink);

    /** PBLink Hash. */
    public Hash: Uint8Array;

    /** PBLink Name. */
    public Name: string;

    /** PBLink Tsize. */
    public Tsize: number;

    /**
     * Encodes the specified PBLink message. Does not implicitly {@link PBLink.verify|verify} messages.
     * @param m PBLink message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IPBLink, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PBLink message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns PBLink
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): PBLink;

    /**
     * Creates a PBLink message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns PBLink
     */
    public static fromObject(d: { [k: string]: any }): PBLink;

    /**
     * Creates a plain object from a PBLink message. Also converts values to other types if specified.
     * @param m PBLink
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: PBLink, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PBLink to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}

/** Properties of a PBNode. */
export interface IPBNode {

    /** PBNode Links */
    Links?: (IPBLink[]|null);

    /** PBNode Data */
    Data?: (Uint8Array|null);
}

/** Represents a PBNode. */
export class PBNode implements IPBNode {

    /**
     * Constructs a new PBNode.
     * @param [p] Properties to set
     */
    constructor(p?: IPBNode);

    /** PBNode Links. */
    public Links: IPBLink[];

    /** PBNode Data. */
    public Data: Uint8Array;

    /**
     * Encodes the specified PBNode message. Does not implicitly {@link PBNode.verify|verify} messages.
     * @param m PBNode message or plain object to encode
     * @param [w] Writer to encode to
     * @returns Writer
     */
    public static encode(m: IPBNode, w?: $protobuf.Writer): $protobuf.Writer;

    /**
     * Decodes a PBNode message from the specified reader or buffer.
     * @param r Reader or buffer to decode from
     * @param [l] Message length if known beforehand
     * @returns PBNode
     * @throws {Error} If the payload is not a reader or valid buffer
     * @throws {$protobuf.util.ProtocolError} If required fields are missing
     */
    public static decode(r: ($protobuf.Reader|Uint8Array), l?: number): PBNode;

    /**
     * Creates a PBNode message from a plain object. Also converts values to their respective internal types.
     * @param d Plain object
     * @returns PBNode
     */
    public static fromObject(d: { [k: string]: any }): PBNode;

    /**
     * Creates a plain object from a PBNode message. Also converts values to other types if specified.
     * @param m PBNode
     * @param [o] Conversion options
     * @returns Plain object
     */
    public static toObject(m: PBNode, o?: $protobuf.IConversionOptions): { [k: string]: any };

    /**
     * Converts this PBNode to JSON.
     * @returns JSON object
     */
    public toJSON(): { [k: string]: any };
}
