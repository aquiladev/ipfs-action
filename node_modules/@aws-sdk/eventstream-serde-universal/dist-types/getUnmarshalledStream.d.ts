import { EventStreamCodec } from "@aws-sdk/eventstream-codec";
import { Encoder, Message } from "@aws-sdk/types";
export declare type UnmarshalledStreamOptions<T> = {
    eventStreamCodec: EventStreamCodec;
    deserializer: (input: Record<string, Message>) => Promise<T>;
    toUtf8: Encoder;
};
export declare function getUnmarshalledStream<T extends Record<string, any>>(source: AsyncIterable<Uint8Array>, options: UnmarshalledStreamOptions<T>): AsyncIterable<T>;
