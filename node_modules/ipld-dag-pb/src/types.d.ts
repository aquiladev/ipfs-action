import CID from 'cids'
import { Format } from 'interface-ipld-format'
import DAGNode from './dag-node/dagNode'
import DAGLink from './dag-link/dagLink'

export interface DAGLinkLike {
  Hash: CID
  Name: string
  Tsize: number
}

export interface DAGNodeLike {
  Data?: Uint8Array
  Links?: DAGLinkLike[]
}

export interface SerializableDAGLink {
  Hash: Uint8Array
  Name: string
  Tsize: number
}

export interface SerializableDAGNode {
  Data?: Uint8Array | null
  Links?: SerializableDAGLink[] | null
}

export interface DAGNodeFormat extends Format<DAGNode> {
  DAGNode: typeof DAGNode
  DAGLink: typeof DAGLink
}
