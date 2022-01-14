const { create, globSource } = require("ipfs-http-client");

module.exports = {
  name: "Infura",
  builder: async (options) => {
    const { timeout } = options;

    return create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
      timeout,
    });
  },
  upload: async (api, options) => {
    const { path, timeout, verbose } = options;

    const files = globSource(path, { recursive: true });
    const { cid } = await api.add(files, { pin: true, timeout });

    if (!cid) throw new Error("Content hash is not found.");

    if (verbose) console.log(cid);

    return cid;
  },
};
