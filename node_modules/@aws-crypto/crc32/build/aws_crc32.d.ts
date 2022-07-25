import { Hash, SourceData } from "@aws-sdk/types";
export declare class AwsCrc32 implements Hash {
    private readonly crc32;
    update(toHash: SourceData): void;
    digest(): Promise<Uint8Array>;
}
