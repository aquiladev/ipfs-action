const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

const pinataOptions = {
  pinataOptions: {
    cidVersion: 0,
    wrapWithDirectory: false
  }
}

module.exports = {
  name: 'Pinata',
  builder: async (options) => {
    const { pinataKey, pinataSecret } = options;

    if (!pinataKey) {
      throw new Error('PinataKey is empty');
    }
  
    if (!pinataSecret) {
      throw new Error('PinataSecret is empty');
    }

    return pinataSDK(pinataKey, pinataSecret);
  },
  upload: async (api, options) => {
    const { path, verbose } = options;

    let source = path;
    if(!fsPath.isAbsolute(source)) {
      const dir = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
      source = fsPath.join(dir, source);
    }

    return api.pinFromFS(source, pinataOptions)
      .then((result) => {
        if (verbose) {
          console.log(result);
        }

        return result.IpfsHash;
      })
      .catch((err) => {
        throw new Error(err);
      });
  }
}