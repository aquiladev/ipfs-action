const IpfsHttpClient = require('ipfs-http-client');
const { globSource } = IpfsHttpClient;

module.exports = {
  async upload(host, port, protocol, path) {
    const ipfs = IpfsHttpClient({ host, port, protocol });

    const source = ipfs.add(globSource(path, { recursive: true }), { pin: true });

    let root;
    for await (const file of source) {
      root = file.cid.toString()
      console.log(file.path, file.cid.toString())
    }

    return root;
  }
}