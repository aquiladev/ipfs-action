import { Message, MessageHeaders } from "@aws-sdk/types";
import { Decoder, Encoder } from "@aws-sdk/types";
/**
 * A Codec that can convert binary-packed event stream messages into
 * JavaScript objects and back again into their binary format.
 */
export declare class EventStreamCodec {
    private readonly headerMarshaller;
    constructor(toUtf8: Encoder, fromUtf8: Decoder);
    /**
     * Convert a structured JavaScript object with tagged headers into a binary
     * event stream message.
     */
    encode({ headers: rawHeaders, body }: Message): Uint8Array;
    /**
     * Convert a binary event stream message into a JavaScript object with an
     * opaque, binary body and tagged, parsed headers.
     */
    decode(message: ArrayBufferView): Message;
    /**
     * Convert a structured JavaScript object with tagged headers into a binary
     * event stream message header.
     */
    formatHeaders(rawHeaders: MessageHeaders): Uint8Array;
}
