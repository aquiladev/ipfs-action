"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUnmarshalledStream = void 0;
function getUnmarshalledStream(source, options) {
    return {
        [Symbol.asyncIterator]: async function* () {
            for await (const chunk of source) {
                const message = options.eventStreamCodec.decode(chunk);
                const { value: messageType } = message.headers[":message-type"];
                if (messageType === "error") {
                    const unmodeledError = new Error(message.headers[":error-message"].value || "UnknownError");
                    unmodeledError.name = message.headers[":error-code"].value;
                    throw unmodeledError;
                }
                else if (messageType === "exception") {
                    const code = message.headers[":exception-type"].value;
                    const exception = { [code]: message };
                    const deserializedException = await options.deserializer(exception);
                    if (deserializedException.$unknown) {
                        const error = new Error(options.toUtf8(message.body));
                        error.name = code;
                        throw error;
                    }
                    throw deserializedException[code];
                }
                else if (messageType === "event") {
                    const event = {
                        [message.headers[":event-type"].value]: message,
                    };
                    const deserialized = await options.deserializer(event);
                    if (deserialized.$unknown)
                        continue;
                    yield deserialized;
                }
                else {
                    throw Error(`Unrecognizable event type: ${message.headers[":event-type"].value}`);
                }
            }
        },
    };
}
exports.getUnmarshalledStream = getUnmarshalledStream;
