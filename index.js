const core = require('@actions/core');
const github = require('@actions/github');

const uploader = require('./uploader');

try {
  const path = core.getInput('path');
  const host = core.getInput('host');
  const port = core.getInput('port');
  const protocol = core.getInput('protocol');
  const timeout = core.getInput('timeout');
  const verbose = (core.getInput('verbose') === 'true');

  uploader.upload(host, port, protocol, path, timeout, verbose)
    .then(hash => {
      core.setOutput('hash', hash);

      if (verbose) {
        // Get the JSON webhook payload for the event that triggered the workflow
        const payload = JSON.stringify(github.context.payload, undefined, 2);
        console.log(`The event payload: ${payload}`);
      }

      console.log('Upload to IPFS finished successfully', hash);
    })
    .catch(core.setFailed);
} catch (error) {
  core.setFailed(error.message);
}