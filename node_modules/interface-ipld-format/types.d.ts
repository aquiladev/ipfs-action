import CID from 'cids'
import Multihashes from 'multihashes'
import Multicodec from 'multicodec'

export interface CIDOptions {
  cidVersion?: CID.CIDVersion,
  hashAlg?: Multihashes.HashCode
}

export interface Format<T> {
  codec: Multicodec.CodecCode
  defaultHashAlg: Multihashes.HashCode

  util: {
    serialize (ipldNode: T) : Uint8Array
    deserialize (binaryBlob: Uint8Array) : T
    cid (binaryBlob: Uint8Array, options?: CIDOptions) : Promise<CID>
  }

  resolver: {
    resolve (binaryBlob: Uint8Array, path: string) : { value: any, remainderPath: string }
    tree (binaryBlob: Uint8Array) : Generator<string, void, undefined>
  }
}
