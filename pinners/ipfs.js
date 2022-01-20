const { create, globSource } = require("ipfs-http-client");
const PeerId = require("peer-id");

module.exports = {
  name: "IPFS",
  builder: async (options) => {
    const { host, port, protocol, timeout, headers } = options;

    return create({ host, port, protocol, timeout, headers });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose, key } = options;

    const files = globSource(path, '**/*');
    const { cid } = await api.add(files, { pin: true, timeout });

    if (!cid) throw new Error("Content hash is not found.");

    if (verbose) console.log(cid);

    let _key;
    if (key) {
      const keys = await api.key.list();

      _key = keys.find((k) => k.name === key);
      if (!_key) {
        _key = await api.key.gen(key, {
          type: "rsa",
          size: 2048,
        });

        if (verbose) console.log(`Created IPNS key ${JSON.stringify(_key)}`);
      }

      await api.name.publish(cid, { key });
    }

    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
      ipns: _key && PeerId.parse(_key.id).toB58String(),
    };
  },
};
