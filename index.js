const core = require('@actions/core');
const github = require('@actions/github');

const uploader = require('../uploader');

try {
  const path = core.getInput('path');
  const host = core.getInput('host');
  const port = core.getInput('port');
  const protocol = core.getInput('protocol');

  uploader.upload(host, port, protocol, path)
    .then(hash => {
      core.setOutput("hash", hash);

      // Get the JSON webhook payload for the event that triggered the workflow
      const payload = JSON.stringify(github.context.payload, undefined, 2);
      console.log(`The event payload: ${payload}`);
    })
    .catch(core.setFailed);
} catch (error) {
  core.setFailed(error.message);
}