import * as fsPath from "node:path";
import { ObjectManager, NameManager } from "@filebase/sdk";
import { filesFromPaths} from "files-from-path";

export default {
  name: "Filebase",
  builder: async (options) => {
    const { filebaseKey, filebaseSecret, filebaseBucket } = options;

    if (!filebaseKey) {
      throw new Error("[filebase] Key is empty. (input `filebaseKey`)");
    }

    if (!filebaseSecret) {
      throw new Error("[filebase] Secret is empty. (input `filebaseSecret`)");
    }

    if (!filebaseBucket) {
      throw new Error("[filebase] Bucket is empty. (input `filebaseBucket`)");
    }

    return {
      key: filebaseKey,
      secret: filebaseSecret,
      bucket: filebaseBucket,
    };
  },
  upload: async (api, options) => {
    console.log(`Parsing options...`);
    const { path, pinName, verbose, key } = options;
    console.log(`Parsed Options`);

    let source = path;
    if (!fsPath.isAbsolute(source)) {
      const dir = (process.env.GITHUB_WORKSPACE || process.cwd()).toString();
      source = fsPath.join(dir, source);
    }

    console.log(`Adding files...`);
    const filesFromPath = await filesFromPaths(source);
    const files = [];
    for await (const file of filesFromPath) {
      files.push({ path: file.name, content: file.stream() });
      if (verbose) {
        console.log(`Added File: ${JSON.stringify(file)}`);
      }
    }

    console.log(`Starting filebase client`);
    const objectManager = new ObjectManager(api.key, api.secret, {
      bucket: api.bucket,
    });
    console.log(`Started filebase client`);

    console.log(`Storing files...`);
    const uploadResult = await objectManager.upload(pinName, files),
      cid = uploadResult.cid;
    console.log(`Stored files...`);
    console.log(`CID: ${cid}`);

    // Set IPNS name
    let ipnsKey = null;
    if (key) {
      const nameManager = new NameManager(api.key, api.secret),
        existingName = await nameManager.get(key);
      ipnsKey = existingName.network_key;

      if (existingName === false) {
        console.log(`Creating name...`);
        await nameManager.create(key, cid);
        console.log(`Created name...`);
      } else {
        console.log(`Updating name...`);
        await nameManager.update(key, cid);
        console.log(`Updated name...`);
      }
    }

    console.log(`Done`);

    if (ipnsKey) {
      return {
        cid: cid,
        ipfs: cid,
        ipns: ipnsKey,
      };
    }
    return {
      cid: cid,
      ipfs: cid,
    };
  },
};
