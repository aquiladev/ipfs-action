const { FilebaseClient } = require("@filebase/client");
const { filesFromPath } = require("files-from-path");

module.exports = {
  name: "Filebase",
  builder: async (options) => {
    const { filebaseKey, filebaseSecret, filebaseBucket } = options;

    if (!filebaseKey) {
      throw new Error("filebaseKey is empty");
    }

    if (!filebaseSecret) {
      throw new Error("filebaseSecret is empty");
    }

    if (!filebaseBucket) {
      throw new Error("filebaseBucket is empty");
    }

    return { key: filebaseKey, secret: filebaseSecret, bucket: filebaseBucket };
  },
  upload: async (api, options) => {
    console.log(`Parsing options...`);
    const { path, pinName, verbose } = options;

    console.log(`Adding files...`);
    const files = [];
    for await (const file of filesFromPath(path, { pathPrefix: path })) {
      files.push(file);
      if (verbose) {
        console.log(`Added File: ${JSON.stringify(file)}`);
      }
    }

    console.log(`Storing files...`);
    let tokenString = `${api.key}:${api.secret}:${api.bucket}`;
    let cid = await FilebaseClient.storeDirectory(
      {
        endpoint: "https://s3.filebase.com",
        token: Buffer.from(tokenString).toString("base64"),
      },
      files,
      pinName
    );
    console.log(`Stored files...`);
    console.log(`CID: ${cid}`);
    console.log(`Done`);

    return {
      cid: cid,
      ipfs: cid,
    };
  },
};
