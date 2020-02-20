# ipfs-action

## Inputs

### `path`

**Required** Directory's path to upload.

### `host`

IPFS host. Default `"cloudflare-ipfs.com"`

### `port`

IPFS port'. Default `"443"`

### `protocol`

IPFS protocol. Default `"https"`

## Outputs

### `hash`

IPFS hash.

## Example usage

```
uses: aquiladev/ipfs-action@v1
with:
  path: ./
```