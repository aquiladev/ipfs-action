const pinataSDK = require("@pinata/sdk");

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
