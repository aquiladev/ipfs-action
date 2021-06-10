const { create, globSource } = require('ipfs-http-client');

module.exports = {
  name: 'IPFS',
  builder: async (options) => {
    const { host, port, protocol, timeout, headers } = options;

    return create({ host, port, protocol, timeout, headers });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose } = options;

    const files = globSource(path, { recursive: true });
    const { cid } = await api.add(files, { pin: true, timeout });

    if (!cid)
      throw new Error('Content hash is not found.');

    if (verbose)
      console.log(cid);

    return cid;
  }
}
