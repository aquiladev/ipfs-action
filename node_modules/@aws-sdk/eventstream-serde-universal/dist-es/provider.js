import { EventStreamMarshaller } from "./EventStreamMarshaller";
export var eventStreamSerdeProvider = function (options) { return new EventStreamMarshaller(options); };
