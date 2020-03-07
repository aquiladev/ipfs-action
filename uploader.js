const IpfsHttpClient = require('ipfs-http-client');
const all = require('it-all');
const fsPath = require("path");
const { globSource } = IpfsHttpClient;

async function _upload(options, retry = 0) {
  const { host, port, protocol, path, timeout, verbose } = options;

  if (verbose)
    console.log(`Attempt ${retry + 1}`)

  const root = fsPath.basename(path);
  const ipfs = IpfsHttpClient({ host, port, protocol, timeout });
  const files = await all(globSource(path, { recursive: true })).catch((err) => { throw err; });
  const source = await all(ipfs.add(files, { pin: true, timeout })).catch((err) => { throw err; });

  let rootHash;
  for (const file of source) {
    if (verbose)
      console.log(file.path, file.cid.toString())

    if (root === file.path) {
      rootHash = file.cid.toString();
    }
  }

  if (!rootHash && retry < 3) {
    return await _upload(options, retry + 1);
  }

  if (!rootHash) {
    throw new Error('Content hash is not found.');
  }

  return rootHash;
}


function upload(options) {
  const { path } = options;

  if (!path) {
    throw new Error('Path is empty');
  }

  return _upload(options);
}

module.exports = {
  upload
}