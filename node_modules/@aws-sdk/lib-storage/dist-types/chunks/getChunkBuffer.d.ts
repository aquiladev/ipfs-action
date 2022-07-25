/// <reference types="node" />
import { RawDataPart } from "../Upload";
export declare function getChunkBuffer(data: Buffer, partSize: number): AsyncGenerator<RawDataPart, void, undefined>;
