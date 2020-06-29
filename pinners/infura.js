const IpfsHttpClient = require('ipfs-http-client');
const fsPath = require('path');
const { globSource } = IpfsHttpClient;

module.exports = {
  name: 'Infura',
  builder: async (options) => {
    const { timeout } = options;

    return IpfsHttpClient({
      host: 'ipfs.infura.io',
      port: '5001',
      protocol: 'https',
      timeout
    });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose } = options;
    const root = fsPath.basename(path);
    
    const files = globSource(path, { recursive: true });
    const source = api.add(files, { pin: true, timeout });

    let rootHash;
    for await (const file of source) {
      if (verbose)
        console.log(file.path, file.cid.toString())

      if (root === file.path)
        rootHash = file.cid.toString();
    }

    if (!rootHash)
      throw new Error('Content hash is not found.');

    return rootHash;
  }
}