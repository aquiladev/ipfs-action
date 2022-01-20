const { create, globSource } = require("ipfs-http-client");
const last = require("it-last");
const fs = require("fs");
const path = require("path");

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
    const { path: p, timeout, verbose } = options;

    const pattern = fs.lstatSync(p).isDirectory() ? `${path.basename(p)}/**/*` : path.basename(p);
    const { cid } = await last(api.addAll(globSource(path.dirname(p), pattern), { pin: true, timeout }));

    if (!cid) throw new Error("Content hash is not found.");

    if (verbose) console.log(cid);

    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
    };
  },
};
