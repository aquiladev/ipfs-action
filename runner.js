import core from "@actions/core";
import github from "@actions/github";

import uploader from "./uploader.js";

async function run() {
  try {
    const path = core.getInput("path");
    const service = core.getInput("service");
    const host = core.getInput("host");
    const port = core.getInput("port");
    const protocol = core.getInput("protocol");
    const headers = core.getInput("headers");
    const key = core.getInput("key");
    const pinName = core.getInput("pinName");
    const pinataKey = core.getInput("pinataKey");
    const pinataSecret = core.getInput("pinataSecret");
    const pinataPinName = core.getInput("pinataPinName");
    const filebaseBucket = core.getInput("filebaseBucket")
    const filebaseKey = core.getInput("filebaseKey")
    const filebaseSecret = core.getInput("filebaseSecret")
    const infuraProjectId = core.getInput("infuraProjectId");
    const infuraProjectSecret = core.getInput("infuraProjectSecret");
    const timeout = core.getInput("timeout");
    const verbose = core.getInput("verbose") === "true";

    const options = {
      path,
      service,
      host,
      port,
      protocol,
      headers: JSON.parse(headers || "{}"),
      key,
      pinName,
      pinataKey,
      pinataSecret,
      pinataPinName,
      filebaseBucket,
      filebaseKey,
      filebaseSecret,
      infuraProjectId,
      infuraProjectSecret,
      timeout,
      verbose,
    };
    const result = await uploader.upload(options).catch((err) => {
      throw err;
    });
    core.setOutput("hash", result.ipfs);
    core.setOutput("cid", result.cid);
    core.setOutput("ipfs", result.ipfs);
    core.setOutput("ipns", result.ipns);

    if (verbose) {
      // Get the JSON webhook payload for the event that triggered the workflow
      const payload = JSON.stringify(github.context.payload, undefined, 2);
      console.log(`The event payload: ${payload}`);
    }

    console.log("Upload to IPFS finished successfully", result);
  } catch (error) {
    core.setFailed(error.message);
    throw error;
  }
}

export default run;
