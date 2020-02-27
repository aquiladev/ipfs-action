const IpfsHttpClient = require('ipfs-http-client');
const fsPath = require("path");

module.exports = {
  async upload({ host, port, protocol, path, verbose }) {
    const root = fsPath.basename(path);
    const ipfs = IpfsHttpClient({ host, port, protocol });
    const source = await ipfs.addFromFs(path, { recursive: true, pin: true, timeout: 20000 });

    let rootHash;
    for (const file of source) {
      if (verbose)
        console.log(file.path, file.hash.toString())

      if (root === file.path) {
        rootHash = file.hash.toString();
      }
    }

    if (!rootHash) {
      throw new Error('Content hash is not found.');
    }

    return rootHash;
  }
}