const IpfsHttpClient = require('ipfs-http-client');
const all = require('it-all');
const fsPath = require('path');
const { globSource } = IpfsHttpClient;

function validate() {
  return true;
}

async function upload(options) {
  const { host, port, protocol, path, timeout, verbose } = options;
  let rootHash;

  const root = fsPath.basename(path);
  const ipfs = IpfsHttpClient({ host, port, protocol, timeout });
  const files = await all(globSource(path, { recursive: true })).catch((err) => { throw err; });
  const source = await all(ipfs.add(files, { pin: true, timeout })).catch((err) => { throw err; });

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

module.exports = {
  validate,
  upload
}