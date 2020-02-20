const core = require('@actions/core');
const github = require('@actions/github');
const ipfsClient = require('ipfs-http-client');

try {
  const path = core.getInput('path');
  const host = core.getInput('host');
  const port = core.getInput('port');
  const protocol = core.getInput('protocol');

  const ipfs = ipfsClient({ host, port, protocol });
  ipfs.addFromFs(path, { recursive: true, pin: true })
    .then(result => {
      const remoteDir = result[result.length - 1]
      core.setOutput("hash", remoteDir.hash);

      // Get the JSON webhook payload for the event that triggered the workflow
      const payload = JSON.stringify(github.context.payload, undefined, 2)
      console.log(`The event payload: ${payload}`);
    }).catch(error => {
      core.setFailed(error.message);
    });
} catch (error) {
  core.setFailed(error.message);
}