const uploader = require('../uploader');

uploader.upload('ipfs.infura.io', 5001, 'https', './test/data', '10m', true)
  .then(x => console.log('>>>', x))
  .catch(console.error);