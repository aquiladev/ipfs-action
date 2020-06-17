const uploader = require('./index');

jest.setTimeout(240000);

const options = {
  path: '',
  service: 'ipfs',
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  timeout: 1000,
  verbose: false
};

test('throws ENOENT: no such file or directory', async () => {
  await expect(uploader.upload({ ...options, path: './1' }))
    .rejects.toThrow();
});

test.skip('throws multipart: NextPart: EOF', async () => {
  await expect(uploader.upload({ ...options, path: './data_empty' }))
    .rejects.toThrow('multipart: NextPart: EOF');
});