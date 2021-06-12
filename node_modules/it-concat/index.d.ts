import BufferList from 'bl'

declare function concat (source: AsyncIterable<string>, options?: { type: 'string' }): Promise<string>
declare function concat (source: AsyncIterable<Buffer | BufferList>, options?: { type: 'buffer' }): Promise<BufferList>
declare function concat (source: AsyncIterable<Buffer | BufferList>, options: { type: 'string' }): Promise<string>

export = concat
