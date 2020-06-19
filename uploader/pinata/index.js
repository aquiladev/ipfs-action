const pinataSDK = require('@pinata/sdk');
const fsPath = require('path');

const pinataOptions = {
  pinataOptions: {
    cidVersion: 0,
    wrapWithDirectory: false
  }
}

function validate({ pinataKey, pinataSecret }) {
  if (!pinataKey) {
    throw new Error('PinataKey is empty');
  }

  if (!pinataSecret) {
    throw new Error('PinataSecret is empty');
  }

  return true;
}

async function upload(options) {
  validate(options);

  const { path, pinataKey, pinataSecret, verbose } = options;
  const pinata = pinataSDK(pinataKey, pinataSecret);

  let source = path;
  if(!fsPath.isAbsolute(source)) {
    const dir = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
    source = fsPath.join(dir, source);
  }

  return pinata.pinFromFS(source, pinataOptions)
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

module.exports = {
  upload
}