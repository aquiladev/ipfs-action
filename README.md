# ipfs-action
IPFS upload action.

<p align="center">
  <img width="400" src="assets/ipfs-action.png" alt="ipfs action">
</p>

## Inputs
Parameter     |Required |Description
---           |---      |---
`path`        |Yes      |Directory's path to upload.
`host`        |No       |IPFS host. Default `ipfs.komputing.org`
`port`        |No       |IPFS host's port. Default `443`
`protocol`    |No       |IPFS host's protocol. Default `https`
`timeout`     |No       |Request timeout. Default `60000` (1 minute)
`verbose`     |No       |Level of verbosity [`false` - quiet, `true` - verbose]. Default `false`

## Outputs

### `hash` - IPFS root's hash.

## Example usage

```
uses: aquiladev/ipfs-action@v1
with:
  path: ./
```