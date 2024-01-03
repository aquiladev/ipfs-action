import pinataSDK from "@pinata/sdk";
import path from "node:path";

let pinataOptions = {
  pinataOptions: {
    cidVersion: 0,
    wrapWithDirectory: false,
  },
};

module.exports = {
  name: "Pinata",
  builder: async (options) => {
    const { pinataKey, pinataSecret } = options;
    if (!pinataKey) {
      throw new Error("[pinata] API Key is empty");
    }

    if (!pinataSecret) {
      throw new Error("[pinata] Secret is empty");
    }

    return pinataSDK(pinataKey, pinataSecret);
  },
  upload: async (api, options) => {
    const { path, pinataPinName, verbose } = options;

    let source = path;
    if (!path.isAbsolute(source)) {
      const dir = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
      source = path.join(dir, source);
    }

    if (pinataPinName) {
      pinataOptions = {
        ...pinataOptions,
        pinataMetadata: {
          name: pinataPinName,
        },
      };
    }

    return api.pinFromFS(source, pinataOptions).then((result) => {
      if (verbose) {
        console.log(result);
      }

      return {
        cid: result.IpfsHash.toString(),
        ipfs: result.IpfsHash.toString(),
      };
    });
  },
};
