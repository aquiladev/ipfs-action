import { Message } from "./Message";
export interface NegativeTestVector {
    expectation: "failure";
    encoded: Uint8Array;
}
export interface PositiveTestVector {
    expectation: "success";
    encoded: Uint8Array;
    decoded: Message;
}
export declare type TestVector = NegativeTestVector | PositiveTestVector;
export declare type TestVectors = Record<string, TestVector>;
