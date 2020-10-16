# ipfs-action
IPFS upload GitHub Action. It allows uploading DApps or content to IPFS in a GitHub pipeline.

<p align="center">
  <img width="400" src="assets/ipfs-action.png" alt="ipfs action">
</p>

## Inputs
Parameter       |Required |Description
---             |---      |---
`path`          |Yes      |Directory's path to upload.
`service`       |No       |Type of target service to upload. Supported services [`ipfs`, `pinata`, `infura`]. Default `ipfs`
`timeout`       |No       |Request timeout. Default `60000` (1 minute)
`verbose`       |No       |Level of verbosity [`false` - quiet, `true` - verbose]. Default `false`
`host`          |No       |[ipfs] IPFS host. Default `ipfs.komputing.org`
`port`          |No       |[ipfs] IPFS host's port. Default `443`
`protocol`      |No       |[ipfs] IPFS host's protocol. Default `https`
`pinataKey`     |No       |[pinata] Api Key. Required for pinata service.
`pinataSecret`  |No       |[pinata] Secret Api Key. Required for pinata service.
`pinataPinName` |No       |[pinata] Human name for pin.

## Outputs

### `hash` - IPFS root's hash.

## Documentation
Take a look [DApps Delivery Guide](https://dapps-delivery-guide.readthedocs.io/)

## Examples

### 1. IPFS starter
```
uses: aquiladev/ipfs-action@v1
with:
  path: ./
```

### 2. IPFS with output and params
```
uses: aquiladev/ipfs-action@v1
id: ipfs
with:
  path: ./build
  host: ipfs.komputing.org
  port: 443
  protocol: https
  timeout: 180000
  verbose: true
```

### 3. Pinata starter
```
uses: aquiladev/ipfs-action@v1
with:
  path: ./build
  service: pinata
  pinataKey: ${{ secrets.PINATA_KEY }}
  pinataSecret: ${{ secrets.PINATA_SECRET }}
```