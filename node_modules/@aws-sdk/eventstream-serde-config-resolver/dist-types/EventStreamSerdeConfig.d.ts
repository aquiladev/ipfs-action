import { EventStreamMarshaller, EventStreamSerdeProvider } from "@aws-sdk/types";
export interface EventStreamSerdeInputConfig {
}
export interface EventStreamSerdeResolvedConfig {
    eventStreamMarshaller: EventStreamMarshaller;
}
interface PreviouslyResolved {
    /**
     * Provide the event stream marshaller for the given runtime
     * @internal
     */
    eventStreamSerdeProvider: EventStreamSerdeProvider;
}
export declare const resolveEventStreamSerdeConfig: <T>(input: T & PreviouslyResolved & EventStreamSerdeInputConfig) => T & EventStreamSerdeResolvedConfig;
export {};
