const IpfsHttpClient = require('ipfs-http-client');

module.exports = {
  name: 'IPFS',
  builder: async (options) => {
    const { host, port, protocol, timeout } = options;

    return IpfsHttpClient({ host, port, protocol, timeout });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose } = options;
    let rootHash;

    const root = fsPath.basename(path);

    const files = await all(globSource(path, { recursive: true })).catch((err) => { throw err; });
    const source = await all(api.add(files, { pin: true, timeout })).catch((err) => { throw err; });

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