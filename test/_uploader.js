const uploader = require('../uploader');

uploader.upload('ipfs.infura.io', 5001, 'https', './test/data', false)
  .then(x => console.log('>>>', x))
  .catch(console.error);