# @ipld/dag-json

An implementation of the [DAG-JSON spec](https://github.com/ipld/specs/blob/master/block-layer/codecs/dag-json.md) ("Directed Acyclic Graph for IPLD") for JavaScript designed for use with [multiformats](https://github.com/multiformats/js-multiformats) or via the higher-level `Block` abstraction in [@ipld/block](https://github.com/ipld/js-block).

## Example

```javascript
import { encode, decode } from '@ipld/dag-json'
import { CID } from 'multiformats'

const obj = {
  x: 1,
  /* CID instances are encoded as links */
  y: [2, 3, CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4')],
  z: {
    a: CID.parse('QmaozNR7DZHQK1ZcU9p7QdrshMvXqWK6gpu5rmrkPdT3L4'),
    b: null,
    c: 'string'
  }
}

let data = encode(obj)
let decoded = decode(data)
decoded.y[0] // 2
CID.asCID(decoded.z.a) // cid instance
```

## Usage

`@ipld/dag-json` is designed to be used within multiformats but can be used separately. `encode()`, `decode()` are available as exports, as are `name` and `code` to match with the corresponding DAG-JSON [multicodec](https://github.com/multiformats/multicodec/).

## License

Licensed under either of

 * Apache 2.0, ([LICENSE-APACHE](LICENSE-APACHE) / http://www.apache.org/licenses/LICENSE-2.0)
 * MIT ([LICENSE-MIT](LICENSE-MIT) / http://opensource.org/licenses/MIT)

### Contribution

Unless you explicitly state otherwise, any contribution intentionally submitted for inclusion in the work by you, as defined in the Apache-2.0 license, shall be dual licensed as above, without any additional terms or conditions.
