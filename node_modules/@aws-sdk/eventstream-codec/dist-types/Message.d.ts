import { Int64 } from "./Int64";
/**
 * An event stream message. The headers and body properties will always be
 * defined, with empty headers represented as an object with no keys and an
 * empty body represented as a zero-length Uint8Array.
 */
export interface Message {
    headers: MessageHeaders;
    body: Uint8Array;
}
export declare type MessageHeaders = Record<string, MessageHeaderValue>;
declare type HeaderValue<K extends string, V> = {
    type: K;
    value: V;
};
export declare type BooleanHeaderValue = HeaderValue<"boolean", boolean>;
export declare type ByteHeaderValue = HeaderValue<"byte", number>;
export declare type ShortHeaderValue = HeaderValue<"short", number>;
export declare type IntegerHeaderValue = HeaderValue<"integer", number>;
export declare type LongHeaderValue = HeaderValue<"long", Int64>;
export declare type BinaryHeaderValue = HeaderValue<"binary", Uint8Array>;
export declare type StringHeaderValue = HeaderValue<"string", string>;
export declare type TimestampHeaderValue = HeaderValue<"timestamp", Date>;
export declare type UuidHeaderValue = HeaderValue<"uuid", string>;
export declare type MessageHeaderValue = BooleanHeaderValue | ByteHeaderValue | ShortHeaderValue | IntegerHeaderValue | LongHeaderValue | BinaryHeaderValue | StringHeaderValue | TimestampHeaderValue | UuidHeaderValue;
export {};
