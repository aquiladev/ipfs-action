const core = require('@actions/core');
const IpfsHttpClient = require('ipfs-http-client');
const fsPath = require("path");

module.exports = {
  async upload({ host, port, protocol, path, timeout, verbose }) {
    core.warning(`TIMEOUT ${timeout}`)
    const root = fsPath.basename(path);
    const ipfs = IpfsHttpClient({ host, port, protocol });
    const source = await ipfs.addFromFs(path, { recursive: true, pin: true, timeout })
      .catch(error => { throw error; });

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