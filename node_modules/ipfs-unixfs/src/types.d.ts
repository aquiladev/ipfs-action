
export interface Mtime {
  secs: number
  nsecs?: number
}

export type MtimeLike = Mtime | { Seconds: number, FractionalNanoseconds?: number } | [number, number] | Date
