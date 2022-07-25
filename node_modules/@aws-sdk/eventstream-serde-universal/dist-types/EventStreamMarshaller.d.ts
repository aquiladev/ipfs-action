import { Decoder, Encoder, EventStreamMarshaller as IEventStreamMarshaller, Message } from "@aws-sdk/types";
export interface EventStreamMarshaller extends IEventStreamMarshaller {
}
export interface EventStreamMarshallerOptions {
    utf8Encoder: Encoder;
    utf8Decoder: Decoder;
}
export declare class EventStreamMarshaller {
    private readonly eventStreamCodec;
    private readonly utfEncoder;
    constructor({ utf8Encoder, utf8Decoder }: EventStreamMarshallerOptions);
    deserialize<T>(body: AsyncIterable<Uint8Array>, deserializer: (input: Record<string, Message>) => Promise<T>): AsyncIterable<T>;
    serialize<T>(input: AsyncIterable<T>, serializer: (event: T) => Message): AsyncIterable<Uint8Array>;
}
