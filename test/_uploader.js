const uploader = require('../uploader');

uploader.upload('ipfs.komputing.org', 443, 'https', './test/data', false)
  .then(x => console.log('>>>', x))
  .catch(console.error);