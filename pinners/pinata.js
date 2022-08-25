const pinataSDK = require("@pinata/sdk");
// const fsPath = require("path");

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
    const { path, pinName, pinataPinName, verbose } = options;
    const _pinName = pinName || pinataPinName;

    // let source = path;
    // if (!fsPath.isAbsolute(source)) {
    //   const dir = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
    //   source = fsPath.join(dir, source);
    // }

    if (_pinName) {
      pinataOptions = {
        ...pinataOptions,
        pinataMetadata: {
          name: _pinName,
        },
      };
    }

    return api.pinFromFS(path, pinataOptions).then((result) => {
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
