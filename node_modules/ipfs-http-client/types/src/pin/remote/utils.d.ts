export function decodePin({ Name: name, Status: status, Cid: cid }: {
    Name: string;
    Cid: string;
    Status: Status;
}): Pin;
export function encodeService(service: any): string;
export function encodeCID(cid: any): string;
export function encodeQuery({ service, cid, name, status, all }: Query & {
    all?: boolean;
}): URLSearchParams;
export function encodeAddParams({ cid, service, background, name, origins }: AddOptions & {
    cid: CID;
}): URLSearchParams;
export type AbortOptions = import('ipfs-core-types/src/utils').AbortOptions;
export type Pin = import('ipfs-core-types/src/pin/remote').Pin;
export type AddOptions = import('ipfs-core-types/src/pin/remote').AddOptions;
export type Query = import('ipfs-core-types/src/pin/remote').Query;
export type Status = import('ipfs-core-types/src/pin/remote').Status;
import { CID } from "multiformats/cid";
//# sourceMappingURL=utils.d.ts.map