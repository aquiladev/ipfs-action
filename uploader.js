const IpfsHttpClient = require('ipfs-http-client');
const all = require('it-all');
const fsPath = require("path");
const { globSource } = IpfsHttpClient;

async function _upload(options) {
  const { host, port, protocol, path, timeout, verbose } = options;

  const root = fsPath.basename(path);
  const ipfs = IpfsHttpClient({ host, port, protocol, timeout });
  const files = await all(globSource(path, { recursive: true })).catch((err) => { throw err; });

  let rootHash;
  for await (const file of files) {
    const uploaded = await _uploadFile(file, ipfs, timeout);

    if (verbose)
      console.log(uploaded.path, uploaded.cid.toString())

    if (root === uploaded.path)
      rootHash = uploaded.cid.toString();
  }

  if (!rootHash)
    throw new Error('Content hash is not found.');

  return rootHash;
}

async function _uploadFile(file, client, timeout, retry = 0) {
  let source;
  try {
    source = await all(client.add(file, { pin: true, timeout }));
  } catch (error) {
    if (retry < 3)
      return await _upload(file, client, timeout, retry + 1);
    throw error;
  }
  return source && source[0];
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