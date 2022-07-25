/// <reference types="node" />
import { AbortMultipartUploadCommandOutput, CompleteMultipartUploadCommandOutput } from "@aws-sdk/client-s3";
import { EventEmitter } from "events";
import { BodyDataTypes, Options, Progress } from "./types";
export interface RawDataPart {
    partNumber: number;
    data: BodyDataTypes;
    lastPart?: boolean;
}
export declare class Upload extends EventEmitter {
    /**
     * S3 multipart upload does not allow more than 10000 parts.
     */
    private MAX_PARTS;
    private queueSize;
    private partSize;
    private leavePartsOnError;
    private tags;
    private client;
    private params;
    private totalBytes?;
    private bytesUploadedSoFar;
    private abortController;
    private concurrentUploaders;
    private createMultiPartPromise?;
    private uploadedParts;
    private uploadId?;
    uploadEvent?: string;
    private isMultiPart;
    private singleUploadResult?;
    constructor(options: Options);
    abort(): Promise<void>;
    done(): Promise<CompleteMultipartUploadCommandOutput | AbortMultipartUploadCommandOutput>;
    on(event: "httpUploadProgress", listener: (progress: Progress) => void): this;
    private __uploadUsingPut;
    private __createMultipartUpload;
    private __doConcurrentUpload;
    private __doMultipartUpload;
    private __notifyProgress;
    private __abortTimeout;
    private __validateInput;
}
