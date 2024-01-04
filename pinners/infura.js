import { create, globSource } from "kubo-rpc-client";
import last from "it-last";
import * as fsPath from "node:path";

export default {
  name: "Infura",
  builder: async (options) => {
    const { infuraProjectId, infuraProjectSecret, headers, timeout } = options;
    if (!infuraProjectId) {
      throw new Error("[infura] ProjectId is empty. (input `infuraProjectId`)");
    }

    if (!infuraProjectSecret) {
      throw new Error(
        "[infura] ProjectSecret is empty. (input `infuraProjectSecret`)"
      );
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
    const { path, pattern, pin } = options;
    const { cid } = await last(
      api.addAll(globSource(fsPath.dirname(path), pattern), { pin })
    );

    if (!cid) throw new Error("Content hash is not found.");
    return {
      cid: cid.toString(),
      ipfs: cid.toString(),
    };
  },
};
