const IpfsHttpClient = require('ipfs-http-client');
const all = require('it-all');
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
    
    const files = await all(globSource(path, { recursive: true })).catch((err) => { throw err; });
    const source = await all(api.add(files, { pin: true, timeout })).catch((err) => { throw err; });

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