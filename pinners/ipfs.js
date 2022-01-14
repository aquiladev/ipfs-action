const { create, globSource } = require("ipfs-http-client");

module.exports = {
  name: "IPFS",
  builder: async (options) => {
    const { host, port, protocol, timeout, headers } = options;

    return create({ host, port, protocol, timeout, headers });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose, key } = options;

    const files = globSource(path, { recursive: true });
    const { cid } = await api.add(files, { pin: true, timeout });

    if (!cid) throw new Error("Content hash is not found.");

    if (verbose) console.log(cid);

    if (key) {
      const keys = await api.key.list();
      console.log(keys);
      if (!keys.find((k) => k.name === key)) {
        await api.key.gen(key, {
          type: "rsa",
          size: 2048,
        });
      }
      const ipns = await api.name.publish(cid, { key: key });
      console.log(ipns);
    }

    return cid;
  },
};
