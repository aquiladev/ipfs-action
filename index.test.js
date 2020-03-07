const run = require('./index');

jest.setTimeout(240000);

describe.skip('index: Integration test', () => {
  it('should upload data dir', async () => {
    process.env['INPUT_PATH'] = './data';
    process.env['INPUT_HOST'] = 'ipfs.infura.io';
    process.env['INPUT_PORT'] = 5001;
    process.env['INPUT_PROTOCOL'] = 'https';
    process.env['INPUT_TIMEOUT'] = 60000;
    process.env['INPUT_VERBOSE'] = false;
    await run();
  });

  it('should upload real dapp dir', async () => {
    process.env['INPUT_PATH'] = 'C:/Users/SergiiBomko/Documents/GitHub/ddns-dapp/build';
    process.env['INPUT_HOST'] = 'ipfs.infura.io';
    process.env['INPUT_PORT'] = 5001;
    process.env['INPUT_PROTOCOL'] = 'https';
    process.env['INPUT_TIMEOUT'] = 120000;
    process.env['INPUT_VERBOSE'] = true;
    await run();
  });
});