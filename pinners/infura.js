const { create, globSource } = require("ipfs-http-client");
const last = require("it-last");
const fs = require("fs");
const path = require("path");

module.exports = {
  name: "Infura",
  builder: async (options) => {
    const { infuraProjectId, infuraProjectSecret, headers, timeout } = options;
    if (!infuraProjectId) {
      throw new Error("[infura] ProjectId is empty");
    }

    if (!infuraProjectSecret) {
      throw new Error("[infura] ProjectSecret is empty");
    }

    const token = Buffer.from(
      `${infuraProjectId}:${infuraProjectSecret}`
    ).toString("base64");

    return create({
      host: "ipfs.infura.io",
      port: "5001",
      protocol: "https",
      headers: {
        ...headers,
        authorization: `Basic ${token}`,
      },
      timeout,
    });
  },
  upload: async (api, options) => {
    const { path: p, verbose } = options;
    const pattern = fs.lstatSync(p).isDirectory()
      ? `${path.basename(p)}/**/*`
      : path.basename(p);
    const { cid } = await last(
      api.addAll(globSource(path.dirname(p), pattern), { pin: true })
    );

    if (!cid) throw new Error("Content hash is not found.");

    if (verbose) console.log(cid);

    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
    };
  },
};
