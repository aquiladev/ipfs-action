const process = require('process');
const cp = require('child_process');
const path = require('path');

test('test runs', () => {
  const ip = path.join(__dirname, 'index.js');
  console.log(cp.execSync(`node ${ip}`, {
    env: {
      INPUT_PATH: './data',
      INPUT_HOST: 'ipfs.infura.io',
      INPUT_PORT: 5001,
      INPUT_PROTOCOL: 'https'
    }
  }).toString());
})